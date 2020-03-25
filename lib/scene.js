import { __awaiter, __generator, __read, __values } from "tslib";
import Pointer from './pointer';
import Resize from './webgl/resize';
import ImageTexture from './texture/image-texture';
import CubeMapTexture from './texture/cube-map-texture';
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
            _this.lastRenderingTime = time;
            if (lastRenderingTime === 0) {
                // Skip the first frame to have a correct delta time.
                return;
            }
            var delta = time - lastRenderingTime;
            Resize(gl, _this.resolution);
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
                    onAnimation(time, delta);
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
    Scene.prototype.createImageTextureAsync = function (url) {
        var _this = this;
        var _a = this, textures = _a.textures, gl = _a.gl;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var texture, img, texture, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof url !== 'string') {
                            reject(Error("[FlatLand.Scene.createImageTextureAsync] url must be a non-empty string!"));
                            return [2 /*return*/];
                        }
                        if (textures.has(url)) {
                            texture = textures.get(url);
                            if (!texture || texture.isDestroyed) {
                                // But it is destroyed, so cleanup.
                                textures.delete(url);
                            }
                            else {
                                texture.share();
                                resolve(texture);
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.loadImageAsync(url)];
                    case 2:
                        img = _a.sent();
                        texture = new ImageTexture({
                            gl: gl, id: url,
                            source: img,
                            width: img.width,
                            height: img.height
                        });
                        textures.set(url, texture);
                        resolve(texture);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        reject(ex_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Scene.prototype.createCubeMapTextureAsync = function (params) {
        var _this = this;
        var _a = this, textures = _a.textures, gl = _a.gl;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var urls, urls_1, urls_1_1, url, id, texture, promises, images, _a, sourceNegX, sourceNegY, sourceNegZ, sourcePosX, sourcePosY, sourcePosZ, texture, ex_2;
            var e_3, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        urls = [
                            params.urlNegX, params.urlNegY, params.urlNegZ,
                            params.urlPosX, params.urlPosY, params.urlPosZ
                        ];
                        try {
                            for (urls_1 = __values(urls), urls_1_1 = urls_1.next(); !urls_1_1.done; urls_1_1 = urls_1.next()) {
                                url = urls_1_1.value;
                                if (typeof url !== 'string') {
                                    reject(Error("[FlatLand.Scene.createCubeMapTextureAsync] url must be a non-empty string!"));
                                    return [2 /*return*/];
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (urls_1_1 && !urls_1_1.done && (_b = urls_1.return)) _b.call(urls_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        id = urls.join('|');
                        if (textures.has(id)) {
                            texture = textures.get(id);
                            if (!texture || texture.isDestroyed) {
                                // But it is destroyed, so cleanup.
                                textures.delete(id);
                            }
                            else {
                                texture.share();
                                resolve(texture);
                                return [2 /*return*/];
                            }
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        promises = urls.map(function (url) { return _this.loadImageAsync(url); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        images = _c.sent();
                        _a = __read(images, 6), sourceNegX = _a[0], sourceNegY = _a[1], sourceNegZ = _a[2], sourcePosX = _a[3], sourcePosY = _a[4], sourcePosZ = _a[5];
                        texture = new CubeMapTexture({
                            gl: gl, id: id,
                            sourceNegX: sourceNegX, sourcePosX: sourcePosX,
                            sourceNegY: sourceNegY, sourcePosY: sourcePosY,
                            sourceNegZ: sourceNegZ, sourcePosZ: sourcePosZ
                        });
                        textures.set(id, texture);
                        resolve(texture);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _c.sent();
                        console.error(ex_2);
                        reject(ex_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Asynchronous load of an image given its URL.
     */
    Scene.prototype.loadImageAsync = function (url) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = url;
            img.onload = function () { return resolve(img); };
            img.onerror = function () { return reject(Error("[FlatLand.Scene.createImageTextureAsync] Unable to load image \"" + url + "\"!")); };
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