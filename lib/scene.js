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
        this.lastRenderingTime = 0;
        this.render = function (time) {
            var e_1, _a;
            if (_this.isRendering) {
                window.requestAnimationFrame(_this.render);
            }
            else {
                return;
            }
            var _b = _this, gl = _b.gl, lastRenderingTime = _b.lastRenderingTime;
            Resize(gl, _this.resolution);
            _this.lastRenderingTime = time;
            var delta = time - lastRenderingTime;
            gl.clearDepth(-1);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.depthFunc(gl.GEQUAL);
            try {
                try {
                    for (var _c = __values(_this.activePainters), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var painter = _d.value;
                        painter.render(time, delta);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
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
    /**
     * Create an atlas that can be used immediatly even if the needed assets are not yet loaded.
     * @param  params
     * @param  onLoad You can provide a callback function that will be called when the assets
     * are loaded.
     */
    Scene.prototype.createAtlasAsync = function (params) {
        var _this = this;
        return new Promise(function (resolve) {
            var name = params.name;
            var sanitizedName = name || _this.getNewName();
            var atlas = new Atlas(_this.gl, sanitizedName);
            _this.atlases.set(sanitizedName, atlas);
            // tslint:disable:no-floating-promises
            atlas.load(params).then(function () { return resolve(atlas); });
        });
    };
    Scene.prototype.createAtlasesAsync = function (params) {
        var _this = this;
        return new Promise(function (resolve) {
            var e_3, _a;
            var atlasNames = Object.keys(params);
            var promises = [];
            try {
                for (var atlasNames_1 = __values(atlasNames), atlasNames_1_1 = atlasNames_1.next(); !atlasNames_1_1.done; atlasNames_1_1 = atlasNames_1.next()) {
                    var atlasName = atlasNames_1_1.value;
                    var atlasParam = params[atlasName];
                    promises.push(_this.createAtlasAsync(atlasParam));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (atlasNames_1_1 && !atlasNames_1_1.done && (_a = atlasNames_1.return)) _a.call(atlasNames_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            Promise.all(promises).then(function (atlases) {
                var result = {};
                for (var i = 0; i < atlases.length; i++) {
                    var name_1 = atlasNames[i];
                    var atlas = atlases[i];
                    result[name_1] = atlas;
                }
                resolve(result);
            });
        });
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
            var name_2 = "atlas-" + ID++;
            if (!this.atlases.has(name_2)) {
                return name_2;
            }
        }
    };
    return Scene;
}());
export default Scene;
//# sourceMappingURL=scene.js.map