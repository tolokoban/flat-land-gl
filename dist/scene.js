var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import Atlas from './atlas';
import Resize from './webgl/resize';
var FlatLand = /** @class */ (function () {
    function FlatLand(canvas) {
        var _this = this;
        this.activePainters = [];
        this.isRendering = false;
        this.resolution = 1;
        this.onAnimation = null;
        this.render = function (time) {
            var e_1, _a;
            if (_this.isRendering)
                window.requestAnimationFrame(_this.render);
            else
                return;
            var gl = _this.gl;
            Resize(gl, _this.resolution);
            gl.clearDepth(-1);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.depthFunc(gl.GEQUAL);
            try {
                try {
                    for (var _b = __values(_this.activePainters), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var painter = _c.value;
                        painter.render(time);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var onAnimation = _this.onAnimation;
                if (typeof onAnimation === 'function') {
                    onAnimation(time);
                }
            }
            catch (ex) {
                console.error(ex);
                _this.stop();
                console.error("###############################");
                console.error("# Rendering has been stopped! #");
                console.error("###############################");
            }
        };
        var gl = canvas.getContext("webgl", {
        // Specify WebGL options.
        });
        if (!gl)
            throw "Unable to create a WegGL context!";
        this.gl = gl;
        this.atlases = new Map();
        this.painters = new Map();
    }
    FlatLand.prototype.getAtlas = function (name) {
        var atlases = this.atlases;
        return atlases.get(name) || null;
    };
    FlatLand.prototype.createAtlas = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, atlas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = params.name;
                        atlas = new Atlas(this.gl, name);
                        this.atlases.set(name, atlas);
                        return [4 /*yield*/, atlas.load(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, atlas];
                }
            });
        });
    };
    FlatLand.prototype.destroyAtlas = function (name) {
        var atlases = this.atlases;
        var atlas = atlases.get(name);
        if (!atlas)
            return false;
        atlases.delete(name);
        atlas.destroy();
        return true;
    };
    /**
     * If a painter with the same name already exists, return false and don't add the new one.
     */
    FlatLand.prototype.$attachPainter = function (painter) {
        if (this.painters.has(painter.name))
            return false;
        this.painters.set(painter.name, painter);
        this.activePainters = this.activePainters
            .filter(function (p) { return p.name; });
        this.activePainters.push(painter);
        return true;
    };
    FlatLand.prototype.$detachPainter = function (name) {
        if (this.painters.has(name))
            return false;
        this.painters.delete(name);
        this.activePainters = this.activePainters
            .filter(function (p) { return p.name; });
        return true;
    };
    Object.defineProperty(FlatLand.prototype, "width", {
        get: function () {
            return this.gl.drawingBufferWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatLand.prototype, "height", {
        get: function () {
            return this.gl.drawingBufferHeight;
        },
        enumerable: true,
        configurable: true
    });
    FlatLand.prototype.start = function () {
        if (this.isRendering)
            return;
        this.isRendering = true;
        window.requestAnimationFrame(this.render);
    };
    FlatLand.prototype.stop = function () {
        this.isRendering = false;
    };
    return FlatLand;
}());
export default FlatLand;
//# sourceMappingURL=scene.js.map