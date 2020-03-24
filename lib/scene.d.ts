import Painter from './painter/painter';
import Pointer from './pointer';
import ImageTexture from './texture/image-texture';
export default class Scene {
    private textures;
    resolution: number;
    onAnimation: ((time: number) => void) | null;
    private readonly _gl;
    private readonly _pointer;
    private activePainters;
    private isRendering;
    private lastRenderingTime;
    get gl(): WebGL2RenderingContext;
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
    constructor(canvas: HTMLCanvasElement);
    /**
     * Define which painter to use and in what order.
     * For better performance, prefer putting background painters at the end of the list.
     */
    use(painters: Painter[]): void;
    createTextureFromImageAsync(url: string): Promise<ImageTexture>;
    /**
     * Start rendering.
     * When a frame is rendered, the function `onAnimation( time: number )` is called.
     */
    start(): void;
    /**
     * Stop rendering.
     */
    stop(): void;
    private readonly render;
}
