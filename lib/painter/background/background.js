/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import { __assign, __extends } from "tslib";
import Painter from '../painter';
import frag from './background.frag';
import vert from './background.vert';
var NB_VERTICES_IN_SQUARE = 4;
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
        _this.alignX = 0.5;
        _this.alignY = 0.5;
        _this.scale = 1;
        var options = __assign({ alignX: 0.5, alignY: 0.5, scale: 1 }, params);
        _this.alignX = options.alignX;
        _this.alignY = options.alignY;
        _this.scale = options.scale;
        _this.atlas = params.atlas;
        return _this;
    }
    BackgroundPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, atlas = _a.atlas, buff = _a.buff, alignX = _a.alignX, alignY = _a.alignY, scale = _a.scale;
        if (!scene || !prg || !atlas || !buff) {
            return;
        }
        var gl = scene.gl;
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        atlas.activate();
        var uniforms = prg;
        uniforms.$uniTexture = 0;
        prg.setUniform('uniSceneAspectRatio', scene.width / scene.height);
        prg.setUniform('uniImageAspectRatio', atlas.width / atlas.height);
        prg.setUniform('uniAlignX', alignX);
        prg.setUniform('uniAlignY', alignY);
        prg.setUniform('uniScale', 1 / scale);
        prg.bindAttribs(buff, 'attXY');
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, NB_VERTICES_IN_SQUARE);
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
        this.prg = this.createProgram({ frag: frag, vert: vert });
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
//# sourceMappingURL=background.js.map