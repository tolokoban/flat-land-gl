import { __extends } from "tslib";
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
var Zoomable2D = /** @class */ (function (_super) {
    __extends(Zoomable2D, _super);
    function Zoomable2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zoomFactor = 1;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    Object.defineProperty(Zoomable2D.prototype, "glslUniforms", {
        get: function () {
            return {
                uniCameraInvertedScale: "float",
                uniCameraX: "float",
                uniCameraZ: "float"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Zoomable2D.prototype, "glslFunction", {
        get: function () {
            return "vec4 worldPointToScreen(vec3 point) {\n    float size = 0.5 / max(uniCanvasWidth, uniCanvasHeight);\n    return vec4((point.x - uniCameraX) * size,\n                (point.y - uniCameraY) * size,\n                point.z,\n                uniCameraInvertedScale);\n}";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param prg - Attributes have to be set in this Program.
     * @param time - Time of the rendered frame in milliseconds.
     * @param delta - Number of milliseconds since the last rendered frame.
     */
    Zoomable2D.prototype.setUniformValues = function (prg) {
        prg.setUniform('uniCameraX', this.x);
        prg.setUniform('uniCameraY', this.y);
        var zoomFactor = this.zoomFactor;
        if (zoomFactor === 0)
            return;
        var invertedScale = 1 / zoomFactor;
        prg.setUniform('uniCameraInvertedScale', invertedScale);
    };
    return Zoomable2D;
}(Camera));
export default Zoomable2D;
//# sourceMappingURL=zoomable-2d.js.map