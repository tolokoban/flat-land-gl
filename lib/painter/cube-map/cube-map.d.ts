/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Texture from '../../texture/cube-map-texture';
import SpaceCamera from '../../camera/space';
import Scene from '../../scene';
import Painter from '../painter';
interface IBackgroundPainterParams {
    texture: Texture;
    camera?: SpaceCamera;
}
export default class BackgroundPainter extends Painter {
    private readonly texture;
    private readonly camera;
    private prg?;
    private buff?;
    private direction;
    private rotationMatrix;
    /**
     * params: { atlas, align }
     * - alignX: Float number between 0 and 1.
     *   Imagine the background is wider than the screen of K pixels.
     *   Then we will shift the background from K * alignX pixels to the left.
     * - alignY: Same for Y axis.
     * If alignX = 0.5 and alignY = 0.5, the background is perfectly centered.
     */
    constructor(params: IBackgroundPainterParams);
    get x(): number;
    set x(v: number);
    get y(): number;
    set y(v: number);
    get z(): number;
    set z(v: number);
    render(time: number, delta: number): void;
    protected destroy(scene: Scene): void;
    protected initialize(scene: Scene): void;
}
export {};
