import Painter from "./painter";
interface IClearPainterParams {
    color?: string;
}
export default class ClearPainter extends Painter {
    private params;
    private _red;
    private _green;
    private _blue;
    private _alpha;
    constructor(params: IClearPainterParams);
    protected initialize(): void;
    protected destroy(): void;
    get red(): number;
    set red(v: number);
    get green(): number;
    set green(v: number);
    get blue(): number;
    set blue(v: number);
    get alpha(): number;
    set alpha(v: number);
    get color(): string;
    set color(cssColor: string);
    render(): void;
}
export {};
//# sourceMappingURL=clear.d.ts.map