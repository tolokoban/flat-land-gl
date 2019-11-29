/**
 *
 */
import Atlas from "../../atlas";
import Scene from "../../scene";
import Painter from "../painter";
import Sprite, { ISprite } from "./sprite";
interface ISpritesPainterParams {
    atlas: Atlas;
}
export default class SpritesPainter extends Painter {
    private params;
    private atlas;
    private prg;
    private dataVert;
    private buffVert;
    private buffElem;
    private sprites;
    private count;
    private capacity;
    constructor(params: ISpritesPainterParams);
    protected destroy(scene: Scene): void;
    protected initialize(scene: Scene): void;
    createSprite(params: Partial<ISprite>): Sprite;
    /**
     * Remove a sprite from the list of sprites to render.
     */
    removeSprite(sprite: Sprite): void;
    render(): void;
    private allocateNewBlock;
    /**
     * Since the vertex array can be reallocated, we cannot give a reference to the
     * Float32Array to any Sprite. Instead, we will give them this function that will
     * return the current array.
     */
    private getData;
}
export {};
//# sourceMappingURL=sprites.d.ts.map