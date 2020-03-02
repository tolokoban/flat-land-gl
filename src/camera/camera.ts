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
export default abstract class Camera {
    /**
     * @return Uniforms defined for the camera.
     * Example: `{ uniCameraX: "float", uniCameraY: "float" }`
     */
    protected abstract get glslUniforms(): { [key: string]: string }

    /**
     * @return Vertey Shader GLSL function taht transforms World coordinates
     * of a point into Screen coordinates.
     */
    protected abstract get glslFunction(): string

    getShaderIncludes() {
        return {
            cameraUniforms: Object.keys(this.glslUniforms)
                .map((key: string) => `uniform ${this.glslUniforms[key]} ${key};\n`)
                .join(""),
            cameraFunction: this.glslFunction
        }
    }

    /**
     * @param prg - Attributes have to be set in this Program.
     * @param width - Canvas Width.
     * @param height - Canvas Height.
     * @param time - Time of the rendered frame in milliseconds.
     * @param delta - Number of milliseconds since the last rendered frame.
     */
    abstract setUniformValues(prg: Program,
                              width: number,
                              height: number,
                              time: number,
                              delta: number): void
}
