/**
 * Clear the screen by filling it with a plain color.
 * This color is defined by attributes red, gree, blue and alpha, which must be between 0 and 1.
 */
import Painter from './painter';
import Scene from '../scene';
export default class ClearPainter extends Painter {
    private _red;
    private _green;
    private _blue;
    private _alpha;
    constructor(name: string, scene: Scene);
    red: number;
    green: number;
    blue: number;
    alpha: number;
    render(): void;
}
//# sourceMappingURL=clear.d.ts.map