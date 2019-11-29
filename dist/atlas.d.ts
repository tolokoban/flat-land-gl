export interface IAtlasParams {
    name?: string;
    image: string;
}
export default class Atlas {
    private gl;
    private _name;
    private readonly texture;
    private _ready;
    private _width;
    private _height;
    constructor(gl: WebGLRenderingContext, _name: string);
    get name(): string;
    get width(): number;
    get height(): number;
    /**
     * Return `true` as soon as an image has been loaded into the graphic card.
     */
    get ready(): boolean;
    /**
     * Remove the texture from the graphic card memory.
     */
    destroy(): void;
    activate(unit?: number): void;
    load(params: IAtlasParams): Promise<void>;
    private loadImage;
}
//# sourceMappingURL=atlas.d.ts.map