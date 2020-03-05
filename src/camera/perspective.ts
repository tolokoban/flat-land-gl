import Space from "./space"
import Program from "../webgl/program"

export interface ICover2DParams {
    // The camera acts like a square of side `size` which covers the screen.
    size: number
}

/**
 */
export default class Cover2D extends Space {
    private readonly params: ICover2DParams
    private perspectiveMatrix = new Float32Array(16)

    /**
     * Field view angle expressed in radians.
     */
    fieldAngle: number = Math.PI / 4
    near = 1
    far = 4097

    constructor(params: Partial<ICover2DParams>) {
        super()
        this.params = {
            size: 1024,
            ...params
        }
        this.orbit(0,0,0, this.params.size, Math.PI / 4, 0)
    }

    get glslUniforms() {
        return {
            uniCameraMatrix: "mat4",
            uniPerspectiveMatrix: "mat4"
        }
    }

    get glslFunction() {
        return `vec4 worldPointToScreen(vec3 point) {
    return uniPerspectiveMatrix * uniCameraMatrix * vec4(point, 1.0);
}`
    }

    /**
     * @param prg - Attributes have to be set in this Program.
     * @param width - Canvas Width.
     * @param height - Canvas Height.
     * @param time - Time of the rendered frame in milliseconds.
     */
    setUniformValues(prg: Program, width: number, height: number) {
        const { near, far, fieldAngle } = this
        const f = Math.tan(0.5 * (Math.PI - fieldAngle));
        const rangeInv = 1.0 / (near - far);

        const result = this.perspectiveMatrix
        result[0] = f * height / width
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

        prg.uniforms.uniCameraMatrix = this.cameraMatrix
        prg.uniforms.uniPerspectiveMatrix = this.perspectiveMatrix
    }
}
