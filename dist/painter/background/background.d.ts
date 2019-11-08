/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Painter from '../painter';
import Scene from '../../scene';
interface IBackgroundPainterParams {
    atlasName: string;
}
export default class BackgroundPainter extends Painter {
    private readonly atlas;
    private readonly prg;
    private readonly buff;
    constructor(name: string, scene: Scene, params: IBackgroundPainterParams);
    render(): void;
}
export {};
//# sourceMappingURL=background.d.ts.map