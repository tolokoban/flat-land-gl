export default class Pointer {
    private _x = 0
    private _y = 0
    private _down = false
    // If 0, pointer is up.
    private _downTime = 0
    private _eventDown = false
    private _eventUp = false

    /** @hidden */
    constructor(private canvas: HTMLCanvasElement) {
        window.addEventListener("mousemove", this.onMouseMove, true)
        window.addEventListener("touchmove", this.onTouchMove, true)
        window.addEventListener("mousedown", this.onMouseDown, true)
        window.addEventListener("touchstart", this.onTouchStart, true)
        window.addEventListener("mouseup", this.onMouseUp, true)
        window.addEventListener("touchend", this.onTouchEnd, true)
    }

    /** @hidden */
    public reset() {
        this._eventDown = false
        this._eventUp = false
    }

    get x() { return this._x }
    get y() { return this._y }

    /** Test if the pointer is touching the screen. */
    get down() { return this._down }
    /** `true` only if the pointer started touching the screen this very last frame. */
    get eventUp() { return this._eventUp }
    /** `true` only if the pointer stopped touching the screen this very last frame. */
    get eventDown() { return this._eventDown }

    private onMouseMove = (evt: MouseEvent) => {
        this.computeCoords(evt.clientX, evt.clientY)
    }

    private onTouchMove = (te: TouchEvent) => {
        const evt = te.touches[0]
        this.computeCoords(evt.clientX, evt.clientY)
    }

    private onMouseDown = (evt: MouseEvent) => {
        this.onDown(evt.clientX, evt.clientY)
    }

    private onTouchStart = (te: TouchEvent) => {
        const evt = te.touches[0]
        this.onDown(evt.clientX, evt.clientY)
    }

    private onDown(x: number, y: number) {
        if (this._downTime !== 0) return
        this.computeCoords(x, y)
        this._down = true
        this._eventDown = true
        this._downTime = Date.now()
    }

    private onMouseUp = (evt: MouseEvent) => {
        this.onUp(evt.clientX, evt.clientY)
    }

    private onTouchEnd = (te: TouchEvent) => {
        const evt = te.touches[0]
        this.onUp(evt.clientX, evt.clientY)
    }

    private onUp(x: number, y: number) {
        if (this._downTime === 0) return
        this.computeCoords(x, y)
        this._down = false
        this._eventUp = true
        this._downTime = 0
    }

    private computeCoords(pointerX: number, pointerY: number) {
        const { canvas } = this
        const rect = canvas.getBoundingClientRect()

        const x = pointerX - rect.left
        const y = pointerY - rect.top
        const w = rect.width
        const h = rect.height

        if (w > h) {
            this._x = 1024 * x / w
            this._y = 1024 * (0.5 * (1 - h / w) + (y / w))
        } else {
            this._x = 1024 * (0.5 * (1 - w / h) + (x / h))
            this._y = 1024 * y / h
        }
    }
}
