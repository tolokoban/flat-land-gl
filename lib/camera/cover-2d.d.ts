import Camera from "./camera";
import Program from "../webgl/program";
export interface ICover2DParams {
    size: number;
}
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
export default class Cover2D extends Camera {
    zoom: number;
    x: number;
    y: number;
    private readonly params;
    constructor(params: Partial<ICover2DParams>);
    get glslUniforms(): {
        uniCameraInvertedScale: string;
        uniCameraScaleX: string;
        uniCameraScaleY: string;
        uniCameraX: string;
        uniCameraY: string;
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
