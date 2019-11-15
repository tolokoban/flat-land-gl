import Atlas, { IAtlasParams } from "./atlas";
import Painter from "./painter/painter";
export default class FlatLand {
    private readonly _gl;
    resolution: number;
    onAnimation: ((time: number) => void) | null;
    private readonly painters;
    private readonly atlases;
    private activePainters;
    private isRendering;
    constructor(canvas: HTMLCanvasElement);
    get gl(): WebGLRenderingContext;
    /**
     * Visible width. Between 0 and 1024.
     */
    get width(): number;
    /**
     * Visible height. Between 0 and 1024.
     */
    get height(): number;
    getAtlas(name: string): Atlas | null;
    createAtlas(params: IAtlasParams): Promise<Atlas>;
    destroyAtlas(name: string): boolean;
    /**
     * @hidden
     * If a painter with the same name already exists, return false and don't add the new one.
     */
    $attachPainter(painter: Painter): boolean;
    /**
     * @hidden
     */
    $detachPainter(name: string): boolean;
    /**
     * Start rendering.
     * When a frame is rendered, the function `onAnimation( time: number )` is called.
     */
    start(): void;
    /**
     * Stop rendering.
     */
    stop(): void;
    private render;
}
//# sourceMappingURL=scene.d.ts.map