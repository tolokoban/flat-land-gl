import { __extends } from "tslib";
import Texture from './texture';
var ImageTexture = /** @class */ (function (_super) {
    __extends(ImageTexture, _super);
    function ImageTexture(params) {
        var _this = _super.call(this, params.gl, params.id, "2d") || this;
        _this.params = params;
        var gl = params.gl;
        gl.bindTexture(gl.TEXTURE_2D, _this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, params.source);
        return _this;
    }
    Object.defineProperty(ImageTexture.prototype, "width", {
        get: function () { return this.params.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageTexture.prototype, "height", {
        get: function () { return this.params.height; },
        enumerable: true,
        configurable: true
    });
    ImageTexture.prototype.update = function (source) {
        var gl = this.params.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    };
    return ImageTexture;
}(Texture));
export default ImageTexture;
//# sourceMappingURL=image-texture.js.map