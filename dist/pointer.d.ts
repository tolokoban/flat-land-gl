export default class Pointer {
    private canvas;
    private _x;
    private _y;
    private _down;
    private _downTime;
    private _eventDown;
    private _eventUp;
    constructor(canvas: HTMLCanvasElement);
    reset(): void;
    get x(): number;
    get y(): number;
    get down(): boolean;
    get eventUp(): any;
    get eventDown(): boolean;
    private onMouseMove;
    private onTouchMove;
    private onMouseDown;
    private onTouchStart;
    private onDown;
    private onMouseUp;
    private onTouchEnd;
    private onUp;
    private computeCoords;
}
//# sourceMappingURL=pointer.d.ts.map