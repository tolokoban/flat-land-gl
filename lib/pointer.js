var VIRTUAL_SCREEN_RESOLUTION = 1024;
var HALF = 0.5;
var Pointer = /** @class */ (function () {
    /** @hidden */
    function Pointer(canvas) {
        var _this = this;
        this._x = 0;
        this._y = 0;
        this._down = false;
        // If 0, pointer is up.
        this._downTime = 0;
        this._eventDown = false;
        this._eventUp = false;
        this.onMouseMove = function (evt) {
            _this.computeCoords(evt.clientX, evt.clientY);
        };
        this.onTouchMove = function (te) {
            var evt = te.touches[0];
            _this.computeCoords(evt.clientX, evt.clientY);
        };
        this.onMouseDown = function (evt) {
            _this.onDown(evt.clientX, evt.clientY);
        };
        this.onTouchStart = function (te) {
            var evt = te.touches[0];
            _this.onDown(evt.clientX, evt.clientY);
        };
        this.onMouseUp = function (evt) {
            _this.onUp(evt.clientX, evt.clientY);
        };
        this.onTouchEnd = function (te) {
            var evt = te.touches[0];
            _this.onUp(evt.clientX, evt.clientY);
        };
        this.canvas = canvas;
        window.addEventListener('mousemove', this.onMouseMove, true);
        window.addEventListener('touchmove', this.onTouchMove, true);
        window.addEventListener('mousedown', this.onMouseDown, true);
        window.addEventListener('touchstart', this.onTouchStart, true);
        window.addEventListener('mouseup', this.onMouseUp, true);
        window.addEventListener('touchend', this.onTouchEnd, true);
    }
    /** @hidden */
    Pointer.prototype.reset = function () {
        this._eventDown = false;
        this._eventUp = false;
    };
    Object.defineProperty(Pointer.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "down", {
        /** Test if the pointer is touching the screen. */
        get: function () {
            return this._down;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "eventUp", {
        /** `true` only if the pointer started touching the screen this very last frame. */
        get: function () {
            return this._eventUp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pointer.prototype, "eventDown", {
        /** `true` only if the pointer stopped touching the screen this very last frame. */
        get: function () {
            return this._eventDown;
        },
        enumerable: true,
        configurable: true
    });
    Pointer.prototype.onDown = function (x, y) {
        if (this._downTime !== 0) {
            return;
        }
        this.computeCoords(x, y);
        this._down = true;
        this._eventDown = true;
        this._downTime = Date.now();
    };
    Pointer.prototype.onUp = function (x, y) {
        if (this._downTime === 0) {
            return;
        }
        this.computeCoords(x, y);
        this._down = false;
        this._eventUp = true;
        this._downTime = 0;
    };
    Pointer.prototype.computeCoords = function (pointerX, pointerY) {
        var canvas = this.canvas;
        var rect = canvas.getBoundingClientRect();
        var x = pointerX - rect.left;
        var y = pointerY - rect.top;
        var w = rect.width;
        var h = rect.height;
        if (w > h) {
            this._x = (VIRTUAL_SCREEN_RESOLUTION * x) / w;
            this._y = VIRTUAL_SCREEN_RESOLUTION * (HALF * (1 - h / w) + y / w);
        }
        else {
            this._x = VIRTUAL_SCREEN_RESOLUTION * (HALF * (1 - w / h) + x / h);
            this._y = (VIRTUAL_SCREEN_RESOLUTION * y) / h;
        }
    };
    return Pointer;
}());
export default Pointer;
//# sourceMappingURL=pointer.js.map