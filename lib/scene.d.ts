import Atlas, { IAtlasParams } from './atlas';
import Painter from './painter/painter';
import Pointer from './pointer';
export default class Scene {
    get gl(): WebGLRenderingContext;
    /**
     * Retreive information about pointer (mouse, pen, finger, ...) state.
     */
    get pointer(): Pointer;
    /**
     * Visible width. Between 0 and 1024.
     */
    get width(): number;
    /**
     * Visible height. Between 0 and 1024.
     */
    get height(): number;
    resolution: number;
    onAnimation: ((time: number) => void) | null;
    private readonly _gl;
    private readonly _pointer;
    private readonly atlases;
    private activePainters;
    private isRendering;
    constructor(canvas: HTMLCanvasElement);
    /**
     * Define which painter to use and in what order.
     * For better performance, prefer putting background painters at the end of the list.
     */
    use(painters: Painter[]): void;
    getAtlas(name: string): Atlas | null;
    /**
     * Create an atlas that can be used immediatly even if the needed assets are not yet loaded.
     * @param  params
     * @param  onLoad You can provide a callback function that will be called when the assets
     * are loaded.
     */
    createAtlas(params: IAtlasParams, onLoad?: (params: IAtlasParams) => void): Atlas;
    /**
     * Create an atlas that can be used immediatly even if the needed assets are not yet loaded.
     * @param  params
     * @param  onLoad You can provide a callback function that will be called when the assets
     * are loaded.
     */
    createAtlasAsync(params: IAtlasParams): Promise<Atlas>;
    destroyAtlas(name: string): boolean;
    /**
     * Start rendering.
     * When a frame is rendered, the function `onAnimation( time: number )` is called.
     */
    start(): void;
    /**
     * Stop rendering.
     */
    stop(): void;
    private getNewName;
    private readonly render;
}
