import Texture from './texture'

export interface IImageTextureParams {
    id: string,
    gl: WebGL2RenderingContext,
    source: HTMLImageElement | HTMLCanvasElement,
    width: number,
    height: number
}

export default class ImageTexture extends Texture {
    constructor(private readonly params: IImageTextureParams) {
        super(params.gl, params.id, "2d")

        const { gl } = params
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, params.source)
    }

    get width() { return this.params.width }
    get height() { return this.params.height }

    update(source: HTMLImageElement | HTMLCanvasElement) {
        const { gl } = this.params
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
    }
}
