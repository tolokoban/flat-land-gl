/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Scene from "../../scene";
import Painter from "../painter";
interface IBackgroundPainterParams {
    atlas: string;
    align?: string;
}
export default class BackgroundPainter extends Painter {
    private params;
    private atlas;
    private prg;
    private buff;
    /**
     * params: { atlas, align }
     * - align: if undefined, the background will be centered.
     *          "R" means that the Right edge of the background is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    constructor(params: IBackgroundPainterParams);
    protected destroy(scene: Scene): void;
    protected initialize(scene: Scene): void;
    render(): void;
}
export {};
//# sourceMappingURL=background.d.ts.map