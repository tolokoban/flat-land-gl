import { __values } from "tslib";
import Program from '../webgl/program';
var Painter = /** @class */ (function () {
    function Painter() {
        this._programs = [];
        this._scene = null;
    }
    Object.defineProperty(Painter.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        set: function (scene) {
            if (scene === this._scene) {
                return;
            }
            if (this._scene) {
                this.internalDestroy(this._scene);
            }
            this._scene = scene;
            if (scene) {
                this.initialize(scene);
            }
        },
        enumerable: true,
        configurable: true
    });
    Painter.prototype.createProgram = function (shaders, includes) {
        if (includes === void 0) { includes = {}; }
        var scene = this._scene;
        if (!scene) {
            throw Error('This painter has no scene!\ncreateProfram() should only be called from initialize().');
        }
        var prg = new Program(scene.gl, shaders, includes);
        this._programs.push(prg);
        return prg;
    };
    Painter.prototype.fatal = function (message) {
        console.error("Fatal error in Painter:", message);
        return new Error(message);
    };
    Painter.prototype.internalDestroy = function (scene) {
        var e_1, _a;
        var gl = scene.gl;
        try {
            for (var _b = __values(this._programs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prg = _c.value;
                gl.deleteProgram(prg);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return Painter;
}());
export default Painter;
//# sourceMappingURL=painter.js.map