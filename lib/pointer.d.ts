export default class Pointer {
    private _x;
    private _y;
    private _down;
    private _downTime;
    private _eventDown;
    private _eventUp;
    private readonly canvas;
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
    private readonly onMouseMove;
    private readonly onTouchMove;
    private readonly onMouseDown;
    private readonly onTouchStart;
    private onDown;
    private readonly onMouseUp;
    private readonly onTouchEnd;
    private onUp;
    private computeCoords;
}
