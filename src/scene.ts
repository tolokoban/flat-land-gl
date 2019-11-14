import Atlas, { IAtlasParams } from "./atlas"
import Painter from "./painter/painter"
import Resize from "./webgl/resize"

export default class FlatLand {

    get width() {
        return this.gl.drawingBufferWidth
    }

    get height() {
        return this.gl.drawingBufferHeight
    }
    public readonly gl: WebGLRenderingContext
    public resolution = 1
    public onAnimation: ((time: number) => void) | null = null
    private readonly painters: Map<string, Painter>
    private readonly atlases: Map<string, Atlas>
    private activePainters: Painter[] = []
    private isRendering = false

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext("webgl", {
            // Specify WebGL options.
        })
        if (!gl) { throw new Error("Unable to create a WegGL context!") }

        this.gl = gl
        this.atlases = new Map()
        this.painters = new Map()
    }

    public getAtlas(name: string): Atlas | null {
        const { atlases } = this
        return atlases.get(name) || null
    }

    public async createAtlas(params: IAtlasParams): Promise<Atlas> {
        const { name } = params
        const atlas = new Atlas(this.gl, name)
        this.atlases.set(name, atlas)
        await atlas.load(params)
        return atlas
    }

    public destroyAtlas(name: string): boolean {
        const { atlases } = this
        const atlas = atlases.get(name)
        if (!atlas) { return false }
        atlases.delete(name)
        atlas.destroy()
        return true
    }

    /**
     * If a painter with the same name already exists, return false and don't add the new one.
     */
    public $attachPainter(painter: Painter): boolean {
        if (this.painters.has(painter.name)) { return false }
        this.painters.set(painter.name, painter)
        this.activePainters = this.activePainters
            .filter( (p: Painter) => p.name)
        this.activePainters.push(painter)
        return true
    }

    public $detachPainter(name: string): boolean {
        if (this.painters.has(name)) { return false }
        this.painters.delete(name)
        this.activePainters = this.activePainters
            .filter( (p: Painter) => p.name)
        return true
    }

    public start() {
        if (this.isRendering) { return }
        this.isRendering = true
        window.requestAnimationFrame(this.render)
    }

    public stop() {
        this.isRendering = false
    }

    private render = (time: number) => {
        if (this.isRendering) { window.requestAnimationFrame(this.render) } else { return }

        const { gl } = this
        Resize(gl, this.resolution)

        gl.clearDepth(-1)
        gl.clear(gl.DEPTH_BUFFER_BIT)
        gl.depthFunc(gl.GEQUAL)

        try {
            for (const painter of this.activePainters) {
                painter.render(time)
            }

            const { onAnimation } = this
            if (typeof onAnimation === "function") {
                onAnimation(time)
            }
        } catch (ex) {
            console.error(ex)
            this.stop()
            console.error("###############################")
            console.error("# Rendering has been stopped! #")
            console.error("###############################")
        }
    }
}
