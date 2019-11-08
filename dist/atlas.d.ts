export interface IAtlasParams {
    name: string;
    image: string;
}
export default class Atlas {
    private gl;
    private params;
    private readonly texture;
    private _ready;
    private _width;
    private _height;
    constructor(gl: WebGLRenderingContext, params: IAtlasParams);
    readonly name: string;
    readonly width: number;
    readonly height: number;
    /**
     * Return `true` as soon as an image has been loaded into the graphic card.
     */
    readonly ready: boolean;
    /**
     * Remove the texture from the graphic card memory.
     */
    destroy(): void;
    activate(unit?: number): void;
    loadImage(url: string): Promise<string>;
}
//# sourceMappingURL=atlas.d.ts.map