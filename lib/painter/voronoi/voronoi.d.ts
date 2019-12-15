/**
 * Fill the screen with a tilable voronoi pattern.
 */
import Scene from '../../scene';
import Painter from '../painter';
export interface IVoronoiPainterParams {
    seeds?: number[];
}
export default class VoronoiPainter extends Painter {
    private prg?;
    private buff?;
    private seeds0;
    private seeds1;
    private lastTime;
    /**
     * params: { atlas, align }
     * - align: if undefined, the voronoi will be centered.
     *          "R" means that the Right edge of the voronoi is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    constructor();
    render(time: number): void;
    private getSeeds;
    protected destroy(scene: Scene): void;
    protected initialize(scene: Scene): void;
}
