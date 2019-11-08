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
            Resize(_this.gl, _this.resolution);
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
        var atlas = new Atlas(this.gl, params);
        this.atlases.set(params.name, atlas);
        return atlas;
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