import Painter from './painter/painter'
import Pointer from './pointer'
import Resize from './webgl/resize'
import Texture from './texture'
import ImageTexture from './texture/image-texture'
import CubeMapTexture from './texture/cube-map-texture'

interface ICubeMapTextureParams {
    urlPosX: string
    urlNegX: string
    urlPosY: string
    urlNegY: string
    urlPosZ: string
    urlNegZ: string
}

export default class Scene {
    private textures: Map<string, Texture> = new Map()
    resolution = 1
    onAnimation: ((time: number, delta: number) => void) | null = null
    private readonly _gl: WebGL2RenderingContext
    private readonly _pointer: Pointer
    private activePainters: Painter[] = []
    private isRendering = false
    private lastRenderingTime = 0

    get gl(): WebGL2RenderingContext {
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
        return this._gl.drawingBufferWidth
    }
    /**
     * Visible height. Between 0 and 1024.
     */
    get height(): number {
        return this._gl.drawingBufferHeight
    }

    constructor(canvas: HTMLCanvasElement) {
        this._pointer = new Pointer(canvas)
        const gl = canvas.getContext('webgl2', {
            // Specify WebGL options.
        })
        if (!gl) {
            throw new Error('Unable to create a WegGL context!')
        }

        this._gl = gl
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

    createImageTextureAsync(url: string): Promise<ImageTexture> {
        const { textures, gl } = this
        return new Promise(async (resolve, reject) => {
            if (typeof url !== 'string') {
                reject(Error("[FlatLand.Scene.createImageTextureAsync] url must be a non-empty string!"))
                return
            }
            if (textures.has(url)) {
                // This texture already exists in the map.
                const texture = textures.get(url) as ImageTexture
                if (!texture || texture.isDestroyed) {
                    // But it is destroyed, so cleanup.
                    textures.delete(url)
                } else {
                    texture.share()
                    resolve(texture)
                    return
                }
            }

            try {
                const img = await this.loadImageAsync(url)
                const texture = new ImageTexture({
                    gl, id: url,
                    source: img,
                    width: img.width,
                    height: img.height
                })
                textures.set(url, texture)
                resolve(texture)
            } catch (ex) {
                reject(ex)
            }
        })
    }

    createCubeMapTextureAsync(params: ICubeMapTextureParams): Promise<CubeMapTexture> {
        const { textures, gl } = this
        return new Promise(async (resolve, reject) => {
            const urls = [
                params.urlNegX, params.urlNegY, params.urlNegZ,
                params.urlPosX, params.urlPosY, params.urlPosZ
            ]
            for (const url of urls) {
                if (typeof url !== 'string') {
                    reject(Error("[FlatLand.Scene.createCubeMapTextureAsync] url must be a non-empty string!"))
                    return
                }
            }
            const id = urls.join('|')
            if (textures.has(id)) {
                // This texture already exists in the map.
                const texture = textures.get(id) as CubeMapTexture
                if (!texture || texture.isDestroyed) {
                    // But it is destroyed, so cleanup.
                    textures.delete(id)
                } else {
                    texture.share()
                    resolve(texture)
                    return
                }
            }

            try {
                const promises = urls.map((url: string) => this.loadImageAsync(url))
                const images = await Promise.all(promises)
                const [
                    sourceNegX, sourceNegY, sourceNegZ,
                    sourcePosX, sourcePosY, sourcePosZ
                ] = images

                const texture = new CubeMapTexture({
                    gl, id,
                    sourceNegX, sourcePosX,
                    sourceNegY, sourcePosY,
                    sourceNegZ, sourcePosZ
                })
                textures.set(id, texture)
                resolve(texture)
            } catch (ex) {
                console.error(ex)
                reject(ex)
            }
        })
    }

    /**
     * Asynchronous load of an image given its URL.
     */
    loadImageAsync(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = () => resolve(img)
            img.onerror = () => reject(Error(`[FlatLand.Scene.createImageTextureAsync] Unable to load image "${url}"!`))
        })
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

    private readonly render = (time: number) => {
        if (this.isRendering) {
            window.requestAnimationFrame(this.render)
        } else {
            return
        }

        const { gl, lastRenderingTime } = this
        this.lastRenderingTime = time
        if (lastRenderingTime === 0) {
            // Skip the first frame to have a correct delta time.
            return
        }

        const delta = time - lastRenderingTime

        Resize(gl, this.resolution)

        gl.clearDepth(+1)
        gl.clear(gl.DEPTH_BUFFER_BIT)
        gl.depthFunc(gl.LESS)
        gl.disable(gl.DEPTH_TEST)

        try {
            for (const painter of this.activePainters) {
                painter.render(time, delta)
            }

            const { onAnimation } = this
            if (typeof onAnimation === 'function') {
                onAnimation(time, delta)
                this.pointer.reset()
            }
        } catch (ex) {
            this.stop()
            console.error('#################################')
            console.error('# Rendering  has  been  stopped #')
            console.error('# because of the followin error #')
            console.error('#################################')
            console.error(ex)
        }
    }
}
