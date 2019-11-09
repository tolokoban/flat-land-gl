var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Clear the screen by filling it with a plain color.
 * This color is defined by attributes red, gree, blue and alpha, which must be between 0 and 1.
 */
import Painter from './painter';
import Color from '../webgl/color';
var ClearPainter = /** @class */ (function (_super) {
    __extends(ClearPainter, _super);
    function ClearPainter(name, scene) {
        var _this = _super.call(this, name, scene) || this;
        _this._red = 0.8;
        _this._green = 0.4;
        _this._blue = 0.2;
        _this._alpha = 1;
        return _this;
    }
    Object.defineProperty(ClearPainter.prototype, "red", {
        get: function () { return this._red; },
        set: function (v) { this._red = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "green", {
        get: function () { return this._green; },
        set: function (v) { this._green = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "blue", {
        get: function () { return this._blue; },
        set: function (v) { this._blue = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "alpha", {
        get: function () { return this._alpha; },
        set: function (v) { this._alpha = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "color", {
        get: function () {
            var color = new Color();
            color.R = this._red;
            color.G = this._green;
            color.B = this._blue;
            color.A = this._alpha;
            return color.stringify();
        },
        set: function (cssColor) {
            var color = new Color(cssColor);
            this._red = color.R;
            this._green = color.G;
            this._blue = color.B;
            this._alpha = color.A;
        },
        enumerable: true,
        configurable: true
    });
    ClearPainter.prototype.render = function () {
        var gl = this.scene.gl;
        gl.clearColor(this._red, this._green, this._blue, this._alpha);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    return ClearPainter;
}(Painter));
export default ClearPainter;
//# sourceMappingURL=clear.js.map