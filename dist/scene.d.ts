import Atlas, { IAtlasParams } from "./atlas";
import Painter from "./painter/painter";
import Pointer from './pointer';
export default class FlatLand {
    private readonly _gl;
    private readonly _pointer;
    resolution: number;
    onAnimation: ((time: number) => void) | null;
    private readonly painters;
    private readonly atlases;
    private activePainters;
    private isRendering;
    private _pointerTap;
    private _pointerDownTime;
    constructor(canvas: HTMLCanvasElement);
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
    get pointerTap(): boolean;
    /**
     * Define which painter to use and in what order.
     * For better performance, prefer putting background painters at the end of the list.
     */
    use(painters: Painter[]): void;
    getAtlas(name: string): Atlas | null;
    createAtlas(params: IAtlasParams): Promise<Atlas>;
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
    private render;
}
//# sourceMappingURL=scene.d.ts.map