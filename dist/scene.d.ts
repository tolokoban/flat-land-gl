import Atlas, { IAtlasParams } from './atlas';
import Painter from './painter/painter';
export default class FlatLand {
    readonly gl: WebGLRenderingContext;
    private readonly painters;
    private readonly atlases;
    private activePainters;
    private isRendering;
    resolution: number;
    onAnimation: ((time: number) => void) | null;
    constructor(canvas: HTMLCanvasElement);
    createAtlas(params: IAtlasParams): Atlas;
    destroyAtlas(atlas: Atlas): boolean;
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