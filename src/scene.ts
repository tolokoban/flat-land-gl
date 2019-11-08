import Atlas, { IAtlasParams } from './atlas'
import Painter from './painter/painter'
import Resize from './webgl/resize'

export default class FlatLand {
    readonly gl: WebGLRenderingContext
    private readonly painters: Map<string, Painter>
    private readonly atlases: Map<string, Atlas>
    private activePainters: Painter[] = []
    private isRendering = false
    resolution = 1
    onAnimation: ((time: number) => void) | null = null

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext("webgl", {
            // Specify WebGL options.
        })
        if (!gl) throw "Unable to create a WegGL context!"

        this.gl = gl
        this.atlases = new Map()
        this.painters = new Map()
    }

    getAtlas(name: string): Atlas | null {
        const { atlases } = this
        return atlases.get(name) || null
    }

    createAtlas(params: IAtlasParams): Atlas {
        const atlas = new Atlas(this.gl, params)
        this.atlases.set(params.name, atlas)
        return atlas
    }

    destroyAtlas(name: string): boolean {
        const { atlases } = this
        const atlas = atlases.get(name)
        if (!atlas) return false
        atlases.delete(name)
        atlas.destroy()
        return true
    }

    /**
     * If a painter with the same name already exists, return false and don't add the new one.
     */
    $attachPainter(painter: Painter): boolean {
        if (this.painters.has(painter.name)) return false
        this.painters.set(painter.name, painter)
        this.activePainters = this.activePainters
            .filter( (p: Painter) => p.name)
        this.activePainters.push(painter)
        return true
    }

    $detachPainter(name: string): boolean {
        if (this.painters.has(name)) return false
        this.painters.delete(name)
        this.activePainters = this.activePainters
            .filter( (p: Painter) => p.name)
        return true
    }

    get width() {
        return this.gl.drawingBufferWidth
    }

    get height() {
        return this.gl.drawingBufferHeight
    }

    start() {
        if (this.isRendering) return
        this.isRendering = true
        window.requestAnimationFrame(this.render)
    }

    stop() {
        this.isRendering = false
    }

    private render = (time: number) => {
        if (this.isRendering) window.requestAnimationFrame(this.render)
        else return

        Resize(this.gl, this.resolution)

        try {
            for (const painter of this.activePainters) {
                painter.render(time)
            }

            const { onAnimation } = this
            if (typeof onAnimation === 'function') {
                onAnimation(time)
            }
        }
        catch(ex) {
            console.error(ex)
            this.stop()
            console.error("###############################")
            console.error("# Rendering has been stopped! #")
            console.error("###############################")
        }
    }
}
