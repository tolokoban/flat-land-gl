import { __assign, __extends } from "tslib";
import Camera from "./camera";
/**
 * The Camera is responsible of transforming World coordinates into Screen coordinates.
 * To do this, the Camera defines the following Vertex Shader function:
 *
 * ```glsl
 * vec4 worldPointToScreen(vec3 point)
 * ```
 *
 * And it can work only if the following attributes are defined:
 *
 * ```glsl
 * attribute float uniCanvasWidth;
 * attribute float uniCanvasHeight;
 * ```
 *
 * Because there is a lot of different cameras, they can need extra attributes.
 * That's why Camera provides two readonly properties:
 * * `glslUniforms`:
 * * `glslFunction`
 */
var Cover2D = /** @class */ (function (_super) {
    __extends(Cover2D, _super);
    function Cover2D(params) {
        var _this = _super.call(this) || this;
        _this.zoom = 1;
        _this.x = 0;
        _this.y = 0;
        _this.params = __assign({ size: 1024 }, params);
        return _this;
    }
    Object.defineProperty(Cover2D.prototype, "glslUniforms", {
        get: function () {
            return {
                uniCameraInvertedScale: "float",
                uniCameraScaleX: "float",
                uniCameraScaleY: "float",
                uniCameraX: "float",
                uniCameraY: "float"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cover2D.prototype, "glslFunction", {
        get: function () {
            return "vec4 worldPointToScreen(vec3 point) {\n    return vec4((point.x - uniCameraX) * uniCameraScaleX,\n                (point.y - uniCameraY) * uniCameraScaleY,\n                point.z,\n                /*uniCameraInvertedScale **/ " + (this.params.size / 2).toFixed(1) + ");\n}";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param prg - Attributes have to be set in this Program.
     * @param width - Canvas Width.
     * @param height - Canvas Height.
     * @param time - Time of the rendered frame in milliseconds.
     */
    Cover2D.prototype.setUniformValues = function (prg, width, height) {
        if (width > height) {
            // Landscape.
            prg.uniforms.uniCameraScaleX = 1;
            prg.uniforms.uniCameraScaleY = width / height;
        }
        else {
            // Portrait.
            prg.uniforms.uniCameraScaleX = height / width;
            prg.uniforms.uniCameraScaleY = 1;
        }
        prg.uniforms.uniCameraX = this.x;
        prg.uniforms.uniCameraY = this.y;
        var zoom = this.zoom;
        if (zoom === 0) {
            prg.uniforms.uniCameraInvertedScale = 1;
        }
        else {
            var invertedScale = 1 / zoom;
            prg.uniforms.uniCameraInvertedScale = invertedScale;
        }
    };
    return Cover2D;
}(Camera));
export default Cover2D;
//# sourceMappingURL=cover-2d.js.map