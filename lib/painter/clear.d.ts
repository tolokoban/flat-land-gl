import Painter from './painter';
interface IClearPainterParams {
    color?: string;
}
export default class ClearPainter extends Painter {
    private readonly params;
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
    private _red;
    private _green;
    private _blue;
    private _alpha;
    constructor(params: IClearPainterParams);
    render(): void;
    protected initialize(): void;
    protected destroy(): void;
}
export {};
