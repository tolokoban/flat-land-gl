import Camera from "./camera";
import Program from "../webgl/program";
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
export default class Zoomable2D extends Camera {
    zoomFactor: number;
    x: number;
    y: number;
    get glslUniforms(): {
        uniCameraInvertedScale: string;
        uniCameraX: string;
        uniCameraZ: string;
    };
    get glslFunction(): string;
    /**
     * @param prg - Attributes have to be set in this Program.
     * @param time - Time of the rendered frame in milliseconds.
     * @param delta - Number of milliseconds since the last rendered frame.
     */
    setUniformValues(prg: Program): void;
}
