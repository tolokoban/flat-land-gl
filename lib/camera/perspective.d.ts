import Space from "./space";
import Program from "../webgl/program";
/**
 */
export default class Perspective extends Space {
    private perspectiveMatrix;
    /**
     * Field view angle expressed in radians.
     */
    fieldAngle: number;
    near: number;
    far: number;
    constructor();
    get glslUniforms(): {
        uniCameraMatrix: string;
        uniPerspectiveMatrix: string;
    };
    get glslFunction(): string;
    /**
     * @param prg - Attributes have to be set in this Program.
     * @param width - Canvas Width.
     * @param height - Canvas Height.
     * @param time - Time of the rendered frame in milliseconds.
     */
    setUniformValues(prg: Program, width: number, height: number): void;
}
