import { __awaiter, __generator } from "tslib";
var Atlas = /** @class */ (function () {
    function Atlas(gl, _name) {
        this.gl = gl;
        this._name = _name;
        this._ready = false;
        this._width = 0;
        this._height = 0;
        var texture = gl.createTexture();
        if (!texture) {
            throw new Error('Unable to create a new texture!');
        }
        this.texture = texture;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    Object.defineProperty(Atlas.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atlas.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atlas.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atlas.prototype, "ready", {
        /**
         * Return `true` as soon as an image has been loaded into the graphic card.
         */
        get: function () {
            return this._ready;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove the texture from the graphic card memory.
     */
    Atlas.prototype.destroy = function () {
        this._ready = false;
        var _a = this, gl = _a.gl, texture = _a.texture;
        gl.deleteTexture(texture);
    };
    Atlas.prototype.activate = function (unit) {
        if (unit === void 0) { unit = 0; }
        var _a = this, gl = _a.gl, texture = _a.texture;
        var UNITS = [
            gl.TEXTURE0,
            gl.TEXTURE1,
            gl.TEXTURE2,
            gl.TEXTURE3,
            gl.TEXTURE4,
            gl.TEXTURE5,
            gl.TEXTURE6,
            gl.TEXTURE7,
        ];
        gl.activeTexture(UNITS[Math.abs(unit) % UNITS.length]);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    };
    Atlas.prototype.activateUnit0 = function () {
        var _a = this, gl = _a.gl, texture = _a.texture;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    };
    /**
     * If you use canvas and you want to repaint this canvas, the atlas won't change.
     * To force it to change, you have to call refresh().
     */
    Atlas.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._params)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.load(this._params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function must not be called directly.
     * It is used internally by painters.
     */
    Atlas.prototype.load = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._ready = false;
                this._params = params;
                if (params.image) {
                    return [2 /*return*/, this.loadImage(params.image)];
                }
                else if (params.canvas) {
                    return [2 /*return*/, this.loadCanvas(params.canvas)];
                }
                return [2 /*return*/];
            });
        });
    };
    Atlas.prototype.loadImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                that = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var img = new Image();
                        that._ready = false;
                        img.onload = function () {
                            var gl = that.gl, texture = that.texture;
                            gl.bindTexture(gl.TEXTURE_2D, texture);
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                            that._ready = true;
                            that._width = img.width;
                            that._height = img.height;
                            resolve();
                        };
                        img.onerror = function () {
                            console.error("Unable to load image \"" + name + "\": ", url);
                            reject();
                        };
                        img.src = url;
                    })];
            });
        });
    };
    Atlas.prototype.loadCanvas = function (canvas) {
        var _a = this, gl = _a.gl, texture = _a.texture;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
        this._ready = true;
        this._width = canvas.width;
        this._height = canvas.height;
    };
    return Atlas;
}());
export default Atlas;
//# sourceMappingURL=atlas.js.map