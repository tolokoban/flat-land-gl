import { __assign, __extends } from "tslib";
import Space from "./space";
/**
 */
var Cover2D = /** @class */ (function (_super) {
    __extends(Cover2D, _super);
    function Cover2D(params) {
        var _this = _super.call(this) || this;
        _this.perspectiveMatrix = new Float32Array(16);
        /**
         * Field view angle expressed in radians.
         */
        _this.fieldAngle = Math.PI / 4;
        _this.near = 1;
        _this.far = 4097;
        _this.params = __assign({ size: 1024 }, params);
        _this.orbit(0, 0, 0, _this.params.size, Math.PI / 4, 0);
        return _this;
    }
    Object.defineProperty(Cover2D.prototype, "glslUniforms", {
        get: function () {
            return {
                uniCameraMatrix: "mat4",
                uniPerspectiveMatrix: "mat4"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cover2D.prototype, "glslFunction", {
        get: function () {
            return "vec4 worldPointToScreen(vec3 point) {\n    return uniPerspectiveMatrix * uniCameraMatrix * vec4(point, 1.0);\n}";
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
        var _a = this, near = _a.near, far = _a.far, fieldAngle = _a.fieldAngle;
        var f = Math.tan(0.5 * (Math.PI - fieldAngle));
        var rangeInv = 1.0 / (near - far);
        var result = this.perspectiveMatrix;
        result[0] = f * height / width;
        result[1] = 0;
        result[2] = 0;
        result[3] = 0;
        result[4] = 0;
        result[5] = f;
        result[6] = 0;
        result[7] = 0;
        result[8] = 0;
        result[9] = 0;
        result[10] = (near + far) * rangeInv;
        result[11] = -1;
        result[12] = 0;
        result[13] = 0;
        result[14] = near * far * rangeInv * 2;
        result[15] = 0;
        prg.uniforms.uniCameraMatrix = this.cameraMatrix;
        prg.uniforms.uniPerspectiveMatrix = this.perspectiveMatrix;
    };
    return Cover2D;
}(Space));
export default Cover2D;
//# sourceMappingURL=perspective.js.map