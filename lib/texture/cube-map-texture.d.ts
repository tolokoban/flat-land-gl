import Texture from './texture';
export interface ICubeMapTextureParams {
    id: string;
    gl: WebGL2RenderingContext;
    sourcePosX: HTMLImageElement | HTMLCanvasElement;
    sourceNegX: HTMLImageElement | HTMLCanvasElement;
    sourcePosY: HTMLImageElement | HTMLCanvasElement;
    sourceNegY: HTMLImageElement | HTMLCanvasElement;
    sourcePosZ: HTMLImageElement | HTMLCanvasElement;
    sourceNegZ: HTMLImageElement | HTMLCanvasElement;
}
export default class CubeMapTexture extends Texture {
    constructor(params: ICubeMapTextureParams);
}
