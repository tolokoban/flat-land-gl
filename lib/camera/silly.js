import { __extends } from "tslib";
import Camera from "./camera";
/**
 * This Camera is silly because it does not transform coordinates.
 */
var Silly = /** @class */ (function (_super) {
    __extends(Silly, _super);
    function Silly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Silly.prototype, "glslUniforms", {
        get: function () { return {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Silly.prototype, "glslFunction", {
        get: function () {
            return "vec4 worldPointToScreen(vec3 point) {\n    return vec4(point, 1.0);\n}";
        },
        enumerable: true,
        configurable: true
    });
    Silly.prototype.setUniformValues = function () { };
    return Silly;
}(Camera));
export default Silly;
//# sourceMappingURL=silly.js.map