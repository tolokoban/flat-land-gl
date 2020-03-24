import Texture from './texture';
export interface IImageTextureParams {
    id: string;
    gl: WebGL2RenderingContext;
    source: HTMLImageElement | HTMLCanvasElement;
    width: number;
    height: number;
}
export default class ImageTexture extends Texture {
    private readonly params;
    constructor(params: IImageTextureParams);
    get width(): number;
    get height(): number;
    update(source: HTMLImageElement | HTMLCanvasElement): void;
}
