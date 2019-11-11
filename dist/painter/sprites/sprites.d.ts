/**
 *
 */
import Painter, { IPainterParams } from '../painter';
import Sprite, { ISprite } from './sprite';
interface ISpritesPainterParams extends IPainterParams {
    atlas: string;
}
export default class SpritesPainter extends Painter {
    private readonly atlas;
    private readonly prg;
    private dataVert;
    private readonly buffVert;
    private readonly buffElem;
    private sprites;
    private count;
    private capacity;
    constructor(params: ISpritesPainterParams);
    createSprite(params: Partial<ISprite>): Sprite;
    render(): void;
    /**
     * Since the vertex array can be reallocated, we cannot give a reference to the Float32Array
     * to any Sprite. Instead, we will give them this function that will return the current array.
     */
    private getData;
}
export {};
//# sourceMappingURL=sprites.d.ts.map