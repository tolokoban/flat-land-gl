import Atlas, { IAtlasParams } from "./atlas"
import Painter from "./painter/painter"
import Resize from "./webgl/resize"
import Pointer from './pointer'

interface IVector2 {
    x: number, y: number
}

export default class FlatLand {
    private readonly _gl: WebGLRenderingContext
    private readonly _pointer: Pointer
    public resolution = 1
    public onAnimation: ((time: number) => void) | null = null
    private readonly painters: Map<string, Painter>
    private readonly atlases: Map<string, Atlas>
    private activePainters: Painter[] = []
    private isRendering = false
    private _pointerX = -1024
    private _pointerY = -1024
    private _pointerTap = false
    // When 0
    private _pointerDownTime = 0

    constructor(canvas: HTMLCanvasElement) {
        this._pointer = new Pointer(canvas)
        const gl = canvas.getContext("webgl", {
            // Specify WebGL options.
        })
        if (!gl) { throw new Error("Unable to create a WegGL context!") }

        this._gl = gl
        this.atlases = new Map()
        this.painters = new Map()
    }

    get gl(): WebGLRenderingContext {
        return this._gl
    }

    /**
     * Retreive information about pointer (mouse, pen, finger, ...) state.
     */
    get pointer() { return this._pointer }

    /**
     * Visible width. Between 0 and 1024.
     */
    get width(): number {
        return this.gl.drawingBufferWidth
    }
    /**
     * Visible height. Between 0 and 1024.
     */
    get height(): number {
        return this.gl.drawingBufferHeight
    }

    /**
     * Last X position of the pointer between 0 and 1024.
     */
    get pointerX(): number {
        return this._pointerX
    }

    /**
     * Last Y position of the pointer between 0 and 1024.
     */
    get pointerY(): number {
        return this._pointerY
    }

    get pointerTap(): boolean {
        return this._pointerTap
    }

    /**
     * Define which painter to use and in what order.
     * For better performance, prefer putting background painters at the end of the list.
     */
    public use(painters: Painter[]) {
        this.activePainters = painters.slice()
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
     * @hidden
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

    /**
     * @hidden
     */
    public $detachPainter(name: string): boolean {
        if (this.painters.has(name)) { return false }
        this.painters.delete(name)
        this.activePainters = this.activePainters
            .filter( (p: Painter) => p.name)
        return true
    }

    /**
     * Start rendering.
     * When a frame is rendered, the function `onAnimation( time: number )` is called.
     */
    public start() {
        if (this.isRendering) { return }
        this.isRendering = true
        window.requestAnimationFrame(this.render)
    }

    /**
     * Stop rendering.
     */
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
                
                this.pointer.reset()
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
