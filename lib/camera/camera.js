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
var Camera = /** @class */ (function () {
    function Camera() {
    }
    Camera.prototype.getShaderIncludes = function () {
        var _this = this;
        return {
            cameraUniforms: Object.keys(this.glslUniforms)
                .map(function (key) { return "uniform " + _this.glslUniforms[key] + " " + key + ";\n"; })
                .join(""),
            cameraFunction: this.glslFunction
        };
    };
    return Camera;
}());
export default Camera;
//# sourceMappingURL=camera.js.map