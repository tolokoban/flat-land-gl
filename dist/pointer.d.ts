export default class Pointer {
    private canvas;
    private _x;
    private _y;
    private _down;
    private _downTime;
    private _eventDown;
    private _eventUp;
    /** @hidden */
    constructor(canvas: HTMLCanvasElement);
    /** @hidden */
    reset(): void;
    get x(): number;
    get y(): number;
    /** Test if the pointer is touching the screen. */
    get down(): boolean;
    /** `true` only if the pointer started touching the screen this very last frame. */
    get eventUp(): boolean;
    /** `true` only if the pointer stopped touching the screen this very last frame. */
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