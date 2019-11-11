/**
 * Clear the screen by filling it with a plain color.
 * This color is defined by attributes red, gree, blue and alpha, which must be between 0 and 1.
 */
import Painter, { IPainterParams } from './painter';
interface IClearPainterParams extends IPainterParams {
    color?: string;
}
export default class ClearPainter extends Painter {
    private _red;
    private _green;
    private _blue;
    private _alpha;
    constructor(params: IClearPainterParams);
    red: number;
    green: number;
    blue: number;
    alpha: number;
    color: string;
    render(): void;
}
export {};
//# sourceMappingURL=clear.d.ts.map