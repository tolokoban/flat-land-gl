/**
 * This is a virtual painter from which all the other will inherit.
 */
import Program from '../webgl/program';
var Painter = /** @class */ (function () {
    function Painter(_name, scene) {
        this._name = _name;
        this.scene = scene;
        scene.$attachPainter(this);
    }
    Painter.prototype.destroy = function () {
        this.scene.$detachPainter(this.name);
    };
    Object.defineProperty(Painter.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Painter.prototype.createProgram = function (shaders, includes) {
        if (includes === void 0) { includes = {}; }
        return new Program(this.scene.gl, shaders, includes);
    };
    Painter.prototype.fatal = function (message) {
        console.error("Fatal error in Painter \"" + this.name + "\":", message);
        throw Error(message);
    };
    return Painter;
}());
export default Painter;
//# sourceMappingURL=painter.js.map