/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Painter, { IPainterParams } from '../painter';
interface IBackgroundPainterParams extends IPainterParams {
    atlas: string;
    align?: string;
}
export default class BackgroundPainter extends Painter {
    private readonly atlas;
    private readonly prg;
    private readonly buff;
    /**
     * params: { atlas, align }
     * - align: if undefined, the background will be centered.
     *          "R" means that the Right edge of the background is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    constructor(params: IBackgroundPainterParams);
    render(): void;
}
export {};
//# sourceMappingURL=background.d.ts.map