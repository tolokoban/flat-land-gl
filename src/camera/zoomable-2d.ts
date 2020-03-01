import Camera from "./camera"
import Program from "../webgl/program"

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
    zoomFactor = 1
    x = 0
    y = 0

    get glslUniforms() {
        return {
            uniCameraInvertedScale: "float",
            uniCameraX: "float",
            uniCameraZ: "float"
        }
    }

    get glslFunction() {
        return `vec4 worldPointToScreen(vec3 point) {
    float size = 0.5 / max(uniCanvasWidth, uniCanvasHeight);
    return vec4((point.x - uniCameraX) * size,
                (point.y - uniCameraY) * size,
                point.z,
                uniCameraInvertedScale);
}`
    }

    /**
     * @param prg - Attributes have to be set in this Program.
     * @param time - Time of the rendered frame in milliseconds.
     * @param delta - Number of milliseconds since the last rendered frame.
     */
    setUniformValues(prg: Program) {
        prg.setUniform('uniCameraX', this.x)
        prg.setUniform('uniCameraY', this.y)
        const { zoomFactor } = this
        if (zoomFactor === 0) return
        const invertedScale = 1 / zoomFactor
        prg.setUniform('uniCameraInvertedScale', invertedScale)
    }
}
