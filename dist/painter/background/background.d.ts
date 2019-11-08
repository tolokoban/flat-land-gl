/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Painter from '../painter';
import Scene from '../../scene';
interface IBackgroundPainterParams {
    atlasName: string;
    align?: string;
}
export default class BackgroundPainter extends Painter {
    private readonly atlas;
    private readonly prg;
    private readonly buff;
    /**
     * params: { atlasName, align }
     * - align: if undefined, the background will be centered.
     *          "R" means that the Right edge of the background is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    constructor(name: string, scene: Scene, params: IBackgroundPainterParams);
    render(): void;
}
export {};
//# sourceMappingURL=background.d.ts.map