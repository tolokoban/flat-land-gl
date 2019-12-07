import Atlas, { IAtlasParams } from './atlas'
import Painter from './painter/painter'
import Pointer from './pointer'
import Resize from './webgl/resize'

let ID = 1

export default class Scene {
    get gl(): WebGLRenderingContext {
        return this._gl
    }

    /**
     * Retreive information about pointer (mouse, pen, finger, ...) state.
     */
    get pointer() {
        return this._pointer
    }

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

    get pointerTap(): boolean {
        return this._pointerTap
    }
    resolution = 1
    onAnimation: ((time: number) => void) | null = null
    private readonly _gl: WebGLRenderingContext
    private readonly _pointer: Pointer
    private readonly atlases: Map<string, Atlas>
    private activePainters: Painter[] = []
    private isRendering = false
    private readonly _pointerTap = false

    constructor(canvas: HTMLCanvasElement) {
        this._pointer = new Pointer(canvas)
        const gl = canvas.getContext('webgl', {
            // Specify WebGL options.
        })
        if (!gl) {
            throw new Error('Unable to create a WegGL context!')
        }

        this._gl = gl
        this.atlases = new Map()
    }

    /**
     * Define which painter to use and in what order.
     * For better performance, prefer putting background painters at the end of the list.
     */
    use(painters: Painter[]) {
        for (const painter of painters) {
            painter.scene = this
        }
        this.activePainters = painters.slice()
    }

    getAtlas(name: string): Atlas | null {
        const { atlases } = this
        return atlases.get(name) || null
    }

    /**
     * Create an atlas that can be used immediatly even if the needed assets are not yet loaded.
     * @param  params
     * @param  onLoad You can provide a callback function that will be called when the assets
     * are loaded.
     */
    createAtlas(params: IAtlasParams, onLoad?: (params: IAtlasParams) => void): Atlas {
        const { name } = params
        const sanitizedName = name || this.getNewName()
        const atlas = new Atlas(this.gl, sanitizedName)
        this.atlases.set(sanitizedName, atlas)

        // tslint:disable:no-floating-promises
        atlas.load(params).then(() => {
            if (typeof onLoad === 'function') {
                onLoad(params)
            }
        })
        return atlas
    }

    destroyAtlas(name: string): boolean {
        const { atlases } = this
        const atlas = atlases.get(name)
        if (!atlas) {
            return false
        }
        atlases.delete(name)
        atlas.destroy()
        return true
    }

    /**
     * Start rendering.
     * When a frame is rendered, the function `onAnimation( time: number )` is called.
     */
    start() {
        if (this.isRendering) {
            return
        }
        this.isRendering = true
        window.requestAnimationFrame(this.render)
    }

    /**
     * Stop rendering.
     */
    stop() {
        this.isRendering = false
    }

    private getNewName() {
        while (true) {
            const name = `atlas-${ID++}`
            if (!this.atlases.has(name)) { return name }
        }
    }

    private readonly render = (time: number) => {
        if (this.isRendering) {
            window.requestAnimationFrame(this.render)
        } else {
            return
        }

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
            if (typeof onAnimation === 'function') {
                onAnimation(time)

                this.pointer.reset()
            }
        } catch (ex) {
            console.error(ex)
            this.stop()
            console.error('###############################')
            console.error('# Rendering has been stopped! #')
            console.error('###############################')
        }
    }
}
