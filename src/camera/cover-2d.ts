import Camera from "./camera"
import Program from "../webgl/program"

export interface ICover2DParams {
    // The camera acts like a square of side `size` which covers the screen.
    size: number
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
    zoom = 1
    x = 0
    y = 0
    private readonly params: ICover2DParams

    constructor(params: Partial<ICover2DParams>) {
        super()
        this.params = {
            size: 1024,
            ...params
        }
    }

    get glslUniforms() {
        return {
            uniCameraInvertedScale: "float",
            uniCameraScaleX: "float",
            uniCameraScaleY: "float",
            uniCameraX: "float",
            uniCameraY: "float"
        }
    }

    get glslFunction() {
        return `vec4 worldPointToScreen(vec3 point) {
    return vec4((point.x - uniCameraX) * uniCameraScaleX,
                (point.y - uniCameraY) * uniCameraScaleY,
                point.z,
                /*uniCameraInvertedScale **/ ${(this.params.size / 2).toFixed(1)});
}`
    }

    /**
     * @param prg - Attributes have to be set in this Program.
     * @param width - Canvas Width.
     * @param height - Canvas Height.
     * @param time - Time of the rendered frame in milliseconds.
     */
    setUniformValues(prg: Program, width: number, height: number) {
        if (width > height) {
            // Landscape.
            prg.uniforms.uniCameraScaleX = 1
            prg.uniforms.uniCameraScaleY = width / height
        } else {
            // Portrait.
            prg.uniforms.uniCameraScaleX = height / width
            prg.uniforms.uniCameraScaleY = 1
        }
        prg.uniforms.uniCameraX = this.x
        prg.uniforms.uniCameraY = this.y
        const { zoom } = this
        if (zoom === 0) {
            prg.uniforms.uniCameraInvertedScale = 1
        } else {
            const invertedScale = 1 / zoom
            prg.uniforms.uniCameraInvertedScale = invertedScale
        }
    }
}
