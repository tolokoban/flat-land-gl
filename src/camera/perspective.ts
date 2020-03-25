import Space from "./space"
import Program from "../webgl/program"
import VertexShader from "./perspective.vert"
import Calc from "../calc"
const DEFAULT_FIELD_ANGLE = 0.25
const MAT4_LENGTH = 16
const HALF = 0.5
const DOUBLE = 2

export default class Perspective extends Space {
    private perspectiveMatrix = new Float32Array(MAT4_LENGTH)

    /**
     * Field view angle expressed in radians.
     */
    fieldAngle: number = Math.PI * DEFAULT_FIELD_ANGLE
    near = 1
    far = 4097

    constructor() {
        super()
        this.orbit(0, 0, 0, 1000, 0, 0)
    }

    get glslUniforms() {
        return {
            uniCameraMatrix: "mat4",
            uniPerspectiveMatrix: "mat4"
        }
    }

    get glslFunction() {
        return VertexShader
    }

    /**
     * @param prg - Attributes have to be set in this Program.
     * @param width - Canvas Width.
     * @param height - Canvas Height.
     * @param time - Time of the rendered frame in milliseconds.
     */
    setUniformValues(prg: Program, width: number, height: number) {
        const { near, far, fieldAngle } = this
        const f = Math.tan(HALF * (Math.PI - fieldAngle));
        const rangeInv = 1.0 / (near - far);

        const result = this.perspectiveMatrix
        result[Calc.M4_00] = f * height / width
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

        prg.uniforms.uniCameraMatrix = this.cameraMatrix
        prg.uniforms.uniPerspectiveMatrix = this.perspectiveMatrix
    }
}
