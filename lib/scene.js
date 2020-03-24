import { __values } from "tslib";
import Pointer from './pointer';
import Resize from './webgl/resize';
import ImageTexture from './texture/image-texture';
var Scene = /** @class */ (function () {
    function Scene(canvas) {
        var _this = this;
        this.textures = new Map();
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
            gl.clearDepth(+1);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.depthFunc(gl.LESS);
            gl.disable(gl.DEPTH_TEST);
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
                _this.stop();
                console.error('#################################');
                console.error('# Rendering  has  been  stopped #');
                console.error('# because of the followin error #');
                console.error('#################################');
                console.error(ex);
            }
        };
        this._pointer = new Pointer(canvas);
        var gl = canvas.getContext('webgl2', {
        // Specify WebGL options.
        });
        if (!gl) {
            throw new Error('Unable to create a WegGL context!');
        }
        this._gl = gl;
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
            return this._gl.drawingBufferWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "height", {
        /**
         * Visible height. Between 0 and 1024.
         */
        get: function () {
            return this._gl.drawingBufferHeight;
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
    Scene.prototype.createTextureFromImageAsync = function (url) {
        var _a = this, textures = _a.textures, gl = _a.gl;
        return new Promise(function (resolve, reject) {
            if (typeof url !== 'string') {
                reject(Error("[FlatLand.Scene.createTextureFromImageAsync] url must be a non-empty string!"));
                return;
            }
            if (textures.has(url)) {
                // This texture already exists in the map.
                var texture = textures.get(url);
                if (!texture || texture.isDestroyed) {
                    // But it is destroyed, so cleanup.
                    textures.delete(url);
                }
                else {
                    texture.share();
                    resolve(texture);
                    return;
                }
            }
            var img = new Image();
            img.src = url;
            img.onload = function () {
                var texture = new ImageTexture({
                    gl: gl, id: url,
                    source: img,
                    width: img.width,
                    height: img.height
                });
                textures.set(url, texture);
                resolve(texture);
            };
            img.onerror = function () { return reject(Error("[FlatLand.Scene.createTextureFromImageAsync] Unable to load image \"" + url + "\"!")); };
        });
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
    return Scene;
}());
export default Scene;
//# sourceMappingURL=scene.js.map