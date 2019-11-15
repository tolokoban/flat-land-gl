import Painter, { IPainterParams } from "./painter";
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