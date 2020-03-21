/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Atlas from '../../atlas';
import Scene from '../../scene';
import Painter from '../painter';
interface IBackgroundPainterParams {
    atlas: Atlas;
    alignX?: number;
    alignY?: number;
    scale?: number;
}
export default class BackgroundPainter extends Painter {
    private atlas?;
    private prg?;
    private buff?;
    alignX: number;
    alignY: number;
    scale: number;
    /**
     * params: { atlas, align }
     * - alignX: Float number between 0 and 1.
     *   Imagine the background is wider than the screen of K pixels.
     *   Then we will shift the background from K * alignX pixels to the left.
     * - alignY: Same for Y axis.
     * If alignX = 0.5 and alignY = 0.5, the background is perfectly centered.
     */
    constructor(params: IBackgroundPainterParams);
    render(): void;
    protected destroy(scene: Scene): void;
    protected initialize(scene: Scene): void;
}
export {};
