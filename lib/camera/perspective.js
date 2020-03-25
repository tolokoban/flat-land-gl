import { __extends } from "tslib";
import Space from "./space";
import VertexShader from "./perspective.vert";
import Calc from "../calc";
var DEFAULT_FIELD_ANGLE = 0.25;
var MAT4_LENGTH = 16;
var HALF = 0.5;
var DOUBLE = 2;
var Perspective = /** @class */ (function (_super) {
    __extends(Perspective, _super);
    function Perspective() {
        var _this = _super.call(this) || this;
        _this.perspectiveMatrix = new Float32Array(MAT4_LENGTH);
        /**
         * Field view angle expressed in radians.
         */
        _this.fieldAngle = Math.PI * DEFAULT_FIELD_ANGLE;
        _this.near = 1;
        _this.far = 4097;
        _this.orbit(0, 0, 0, 1000, 0, 0);
        return _this;
    }
    Object.defineProperty(Perspective.prototype, "glslUniforms", {
        get: function () {
            return {
                uniCameraMatrix: "mat4",
                uniPerspectiveMatrix: "mat4"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Perspective.prototype, "glslFunction", {
        get: function () {
            return VertexShader;
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
    Perspective.prototype.setUniformValues = function (prg, width, height) {
        var _a = this, near = _a.near, far = _a.far, fieldAngle = _a.fieldAngle;
        var f = Math.tan(HALF * (Math.PI - fieldAngle));
        var rangeInv = 1.0 / (near - far);
        var result = this.perspectiveMatrix;
        result[Calc.M4_00] = f * height / width;
        result[Calc.M4_10] = 0;
        result[Calc.M4_20] = 0;
        result[Calc.M4_30] = 0;
        result[Calc.M4_01] = 0;
        result[Calc.M4_11] = f;
        result[Calc.M4_21] = 0;
        result[Calc.M4_31] = 0;
        result[Calc.M4_02] = 0;
        result[Calc.M4_12] = 0;
        result[Calc.M4_22] = (near + far) * rangeInv;
        result[Calc.M4_32] = -1;
        result[Calc.M4_03] = 0;
        result[Calc.M4_13] = 0;
        result[Calc.M4_23] = near * far * rangeInv * DOUBLE;
        result[Calc.M4_33] = 0;
        prg.uniforms.uniCameraMatrix = this.cameraMatrix;
        prg.uniforms.uniPerspectiveMatrix = this.perspectiveMatrix;
    };
    return Perspective;
}(Space));
export default Perspective;
//# sourceMappingURL=perspective.js.map