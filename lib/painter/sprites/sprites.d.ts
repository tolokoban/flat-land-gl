import ImageTexture from '../../texture/image-texture';
import Camera from '../../camera/camera';
import Painter from '../painter';
import Scene from '../../scene';
import Quad, { IQuad } from './quad';
import Sprite, { ISprite } from './sprite';
interface ISpritesPainterParams {
    camera: Camera;
    texture: ImageTexture;
}
export default class SpritesPainter extends Painter {
    private _capacity;
    private _dataVert;
    private _buffElem?;
    private _buffVert?;
    private readonly _texture;
    private readonly _camera;
    private _prg?;
    private readonly _deferedSpritesUpdate;
    private readonly _sprites;
    constructor(params: ISpritesPainterParams);
    get texture(): ImageTexture;
    get count(): number;
    /**
     * Register a new sprite that will be immediatly visible.
     */
    createSprite(params: Partial<ISprite>): Sprite;
    /**
     * Register a new sprite that will be immediatly visible.
     */
    createQuad(params: Partial<IQuad>): Quad;
    private _update;
    /**
     * Only called by an instance os Sprite.
     */
    private _allocate;
    /**
     * Only called by an instance os Sprite.
     */
    private _destroy;
    /**
     * When the number of sprites exceeds the current capacity, we must allocate a new BLOCK.
     * This function cannot be called before painter initialization.
     */
    private _allocateNewBlock;
    render(time: number, delta: number): void;
    protected initialize(scene: Scene): void;
    protected destroy(): void;
    private manageDeferedSpritesUpdates;
}
export {};
