export default class Atlas {
    private readonly texture: WebGLTexture
    private _isReady = false

    constructor(private gl: WebGLRenderingContext,
                private name: string) {
        const texture = gl.createTexture()
        if (!texture) throw "Unable to create a new texture!"
        this.texture = texture
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    }

    get isReady() { return this._isReady }

    async loadImage(url: string): Promise<string> {
        const that = this

        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                const { gl, name, texture } = that
                gl.bindTexture(gl.TEXTURE_2D, texture)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
                that._isReady = true
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
