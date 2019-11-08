export interface IAtlasParams {
    name: string,
    // URL of an image JPG, PNG, GIF or WEBP.
    image: string
}

export default class Atlas {
    private readonly texture: WebGLTexture
    private _ready = false
    private _width = 0
    private _height = 0

    constructor(private gl: WebGLRenderingContext,
                private params: IAtlasParams) {
        const texture = gl.createTexture()
        if (!texture) throw "Unable to create a new texture!"
        this.texture = texture
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        this.loadImage(params.image)
    }

    get name() { return this.params.name }
    get width() { return this._width }
    get height() { return this._height }
    /**
     * Return `true` as soon as an image has been loaded into the graphic card.
     */
    get ready() { return this._ready }

    /**
     * Remove the texture from the graphic card memory.
     */
    destroy() {
        this._ready = false
        const { gl, texture } = this
        gl.deleteTexture(texture)
    }

    async loadImage(url: string): Promise<string> {
        const that = this

        return new Promise((resolve, reject) => {
            const img = new Image()
            that._ready = false
            img.onload = () => {
                const { gl, params, texture } = that
                const { name } = params
                gl.bindTexture(gl.TEXTURE_2D, texture)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
                that._ready = true
                that._width = img.width
                that._height = img.height
                resolve(name)
            }
            img.onerror = () => {
                console.error(`Unable to load image "${name}": `, url)
                reject(name)
            }
            img.src = url
        })
    }
}
