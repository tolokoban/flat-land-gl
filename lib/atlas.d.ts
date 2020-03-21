export interface IAtlasParams {
    name?: string;
    image?: string;
    canvas?: HTMLCanvasElement;
}
export default class Atlas {
    private readonly gl;
    private readonly _name;
    private readonly texture;
    private _ready;
    private _width;
    private _height;
    private _params;
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
    activateUnit0(): void;
    /**
     * If you use canvas and you want to repaint this canvas, the atlas won't change.
     * To force it to change, you have to call refresh().
     */
    refresh(): Promise<void>;
    /**
     * This function must not be called directly.
     * It is used internally by painters.
     */
    load(params: IAtlasParams): Promise<void>;
    private loadImage;
    private loadCanvas;
}
