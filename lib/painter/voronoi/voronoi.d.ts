/**
 * Fill the screen with a tilable voronoi pattern.
 */
import Scene from '../../scene';
import Painter from '../painter';
export interface IVoronoiPainterParams {
    seeds: number[];
    colors: number[];
    border: number;
    light: number;
}
export default class VoronoiPainter extends Painter {
    private readonly params;
    private prg?;
    private buff?;
    private seeds;
    private colors;
    /**
     * params: { atlas, align }
     * - align: if undefined, the voronoi will be centered.
     *          "R" means that the Right edge of the voronoi is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    constructor(params: IVoronoiPainterParams);
    render(): void;
    protected destroy(scene: Scene): void;
    protected initialize(scene: Scene): void;
}
