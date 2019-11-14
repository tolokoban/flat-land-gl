import Atlas, { IAtlasParams } from "./atlas";
import Painter from "./painter/painter";
export default class FlatLand {
    get width(): number;
    get height(): number;
    readonly gl: WebGLRenderingContext;
    resolution: number;
    onAnimation: ((time: number) => void) | null;
    private readonly painters;
    private readonly atlases;
    private activePainters;
    private isRendering;
    constructor(canvas: HTMLCanvasElement);
    getAtlas(name: string): Atlas | null;
    createAtlas(params: IAtlasParams): Promise<Atlas>;
    destroyAtlas(name: string): boolean;
    /**
     * If a painter with the same name already exists, return false and don't add the new one.
     */
    $attachPainter(painter: Painter): boolean;
    $detachPainter(name: string): boolean;
    start(): void;
    stop(): void;
    private render;
}
//# sourceMappingURL=scene.d.ts.map