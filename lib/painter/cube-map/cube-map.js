import { __extends } from "tslib";
import PerspectiveCamera from '../../camera/perspective';
import Painter from '../painter';
import frag from './cube-map.frag';
import vert from './cube-map.vert';
var NB_VERTICES_IN_SQUARE = 4;
var VECTOR3_LENGTH = 3;
var MATRIX3_LENGTH = 9;
var X_INDEX = 0;
var Y_INDEX = 1;
var Z_INDEX = 2;
var BackgroundPainter = /** @class */ (function (_super) {
    __extends(BackgroundPainter, _super);
    /**
     * params: { atlas, align }
     * - alignX: Float number between 0 and 1.
     *   Imagine the background is wider than the screen of K pixels.
     *   Then we will shift the background from K * alignX pixels to the left.
     * - alignY: Same for Y axis.
     * If alignX = 0.5 and alignY = 0.5, the background is perfectly centered.
     */
    function BackgroundPainter(params) {
        var _this = _super.call(this) || this;
        _this.direction = new Float32Array(VECTOR3_LENGTH);
        _this.rotationMatrix = new Float32Array(MATRIX3_LENGTH);
        _this.texture = params.texture;
        _this.x = 0;
        _this.y = 0;
        _this.z = -1;
        if (params.camera) {
            _this.camera = params.camera;
        }
        else {
            var camera = new PerspectiveCamera();
            _this.camera = camera;
        }
        return _this;
    }
    Object.defineProperty(BackgroundPainter.prototype, "x", {
        get: function () { return this.direction[X_INDEX]; },
        set: function (v) { this.direction[X_INDEX] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackgroundPainter.prototype, "y", {
        get: function () { return this.direction[Y_INDEX]; },
        set: function (v) { this.direction[Y_INDEX] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackgroundPainter.prototype, "z", {
        get: function () { return this.direction[Z_INDEX]; },
        set: function (v) { this.direction[Z_INDEX] = v; },
        enumerable: true,
        configurable: true
    });
    BackgroundPainter.prototype.render = function (time, delta) {
        var _a = this, scene = _a.scene, prg = _a.prg, texture = _a.texture, buff = _a.buff, camera = _a.camera;
        if (!scene || !prg || !buff) {
            return;
        }
        var gl = scene.gl;
        var savedDepthFunc = gl.getParameter(gl.DEPTH_FUNC);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        camera.setUniformValues(prg, scene.width, scene.height, time, delta);
        texture.attachToUnit(0);
        var uniforms = prg.uniforms;
        uniforms.uniTexture = 0;
        uniforms.uniSceneAspectRatio = scene.width / scene.height;
        uniforms.uniRotation = this.rotationMatrix;
        prg.bindAttribs(buff, 'attXY');
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, NB_VERTICES_IN_SQUARE);
        gl.depthFunc(savedDepthFunc);
    };
    BackgroundPainter.prototype.destroy = function (scene) {
        var gl = scene.gl;
        var buff = this.buff;
        if (!buff) {
            return;
        }
        gl.deleteBuffer(buff);
    };
    BackgroundPainter.prototype.initialize = function (scene) {
        var camera = this.camera;
        this.prg = this.createProgram({ frag: frag, vert: vert }, camera.getShaderIncludes());
        var gl = scene.gl;
        var buff = gl.createBuffer();
        if (!buff) {
            throw this.fatal('Not enough memory to create an array buffer!');
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, +1,
            -1, -1,
            +1, +1,
            +1, -1
        ]), gl.STATIC_DRAW);
        this.buff = buff;
    };
    return BackgroundPainter;
}(Painter));
export default BackgroundPainter;
//# sourceMappingURL=cube-map.js.map