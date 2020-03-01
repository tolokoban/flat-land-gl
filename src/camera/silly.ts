import Camera from "./camera"

/**
 * This Camera is silly because it does not transform coordinates.
 */
export default class Silly extends Camera {
    get glslUniforms() { return {} }

    get glslFunction() {
        return `vec4 worldPointToScreen(vec3 point) {
    return vec4(point, 1.0);
}`
    }

    setUniformValues() { /* empty */ }
}
