/**
 *
 */
import Painter from '../painter';
import Scene from '../../scene';
interface ISpritesPainterParams {
    atlasName: string;
}
export default class SpritesPainter extends Painter {
    private readonly atlas;
    private readonly prg;
    private readonly buffVert;
    private readonly buffElem;
    private count;
    private capacity;
    constructor(name: string, scene: Scene, params: ISpritesPainterParams);
    render(): void;
}
export {};
//# sourceMappingURL=sprites.d.ts.map