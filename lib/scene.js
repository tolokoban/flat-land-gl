import { __values } from "tslib";
import Atlas from './atlas';
import Pointer from './pointer';
import Resize from './webgl/resize';
var ID = 1;
var Scene = /** @class */ (function () {
    function Scene(canvas) {
        var _this = this;
        this.resolution = 1;
        this.onAnimation = null;
        this.activePainters = [];
        this.isRendering = false;
        this._pointerTap = false;
        this.render = function (time) {
            var e_1, _a;
            if (_this.isRendering) {
                window.requestAnimationFrame(_this.render);
            }
            else {
                return;
            }
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
                    _this.pointer.reset();
                }
            }
            catch (ex) {
                console.error(ex);
                _this.stop();
                console.error('###############################');
                console.error('# Rendering has been stopped! #');
                console.error('###############################');
            }
        };
        this._pointer = new Pointer(canvas);
        var gl = canvas.getContext('webgl', {
        // Specify WebGL options.
        });
        if (!gl) {
            throw new Error('Unable to create a WegGL context!');
        }
        this._gl = gl;
        this.atlases = new Map();
    }
    Object.defineProperty(Scene.prototype, "gl", {
        get: function () {
            return this._gl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "pointer", {
        /**
         * Retreive information about pointer (mouse, pen, finger, ...) state.
         */
        get: function () {
            return this._pointer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "width", {
        /**
         * Visible width. Between 0 and 1024.
         */
        get: function () {
            return this.gl.drawingBufferWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "height", {
        /**
         * Visible height. Between 0 and 1024.
         */
        get: function () {
            return this.gl.drawingBufferHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "pointerTap", {
        get: function () {
            return this._pointerTap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Define which painter to use and in what order.
     * For better performance, prefer putting background painters at the end of the list.
     */
    Scene.prototype.use = function (painters) {
        var e_2, _a;
        try {
            for (var painters_1 = __values(painters), painters_1_1 = painters_1.next(); !painters_1_1.done; painters_1_1 = painters_1.next()) {
                var painter = painters_1_1.value;
                painter.scene = this;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (painters_1_1 && !painters_1_1.done && (_a = painters_1.return)) _a.call(painters_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.activePainters = painters.slice();
    };
    Scene.prototype.getAtlas = function (name) {
        var atlases = this.atlases;
        return atlases.get(name) || null;
    };
    /**
     * Create an atlas that can be used immediatly even if the needed assets are not yet loaded.
     * @param  params
     * @param  onLoad You can provide a callback function that will be called when the assets
     * are loaded.
     */
    Scene.prototype.createAtlas = function (params, onLoad) {
        var name = params.name;
        var sanitizedName = name || this.getNewName();
        var atlas = new Atlas(this.gl, sanitizedName);
        this.atlases.set(sanitizedName, atlas);
        // tslint:disable:no-floating-promises
        atlas.load(params).then(function () {
            if (typeof onLoad === 'function') {
                onLoad(params);
            }
        });
        return atlas;
    };
    Scene.prototype.destroyAtlas = function (name) {
        var atlases = this.atlases;
        var atlas = atlases.get(name);
        if (!atlas) {
            return false;
        }
        atlases.delete(name);
        atlas.destroy();
        return true;
    };
    /**
     * Start rendering.
     * When a frame is rendered, the function `onAnimation( time: number )` is called.
     */
    Scene.prototype.start = function () {
        if (this.isRendering) {
            return;
        }
        this.isRendering = true;
        window.requestAnimationFrame(this.render);
    };
    /**
     * Stop rendering.
     */
    Scene.prototype.stop = function () {
        this.isRendering = false;
    };
    Scene.prototype.getNewName = function () {
        while (true) {
            var name_1 = "atlas-" + ID++;
            if (!this.atlases.has(name_1)) {
                return name_1;
            }
        }
    };
    return Scene;
}());
export default Scene;
//# sourceMappingURL=scene.js.map