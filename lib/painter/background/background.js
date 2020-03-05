/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import { __extends } from "tslib";
import castString from '../../converter/string';
import Painter from '../painter';
var NB_VERTICES_IN_SQUARE = 4;
var BackgroundPainter = /** @class */ (function (_super) {
    __extends(BackgroundPainter, _super);
    /**
     * params: { atlas, align }
     * - align: if undefined, the background will be centered.
     *          "R" means that the Right edge of the background is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    function BackgroundPainter(params) {
        var _this = _super.call(this) || this;
        _this.params = params;
        return _this;
    }
    BackgroundPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, atlas = _a.atlas, buff = _a.buff;
        if (!scene || !prg || !atlas || !buff) {
            return;
        }
        var gl = scene.gl;
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        atlas.activate();
        var uniforms = prg;
        uniforms.$uniTexture = 0;
        prg.setUniform('uniAspectRatio', scene.width / scene.height);
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
        var params = this.params;
        var atlas = params.atlas;
        this.atlas = atlas;
        this.prg = this.createProgram({
            frag: FRAG,
            vert: getVert(castString(params.align).toUpperCase()),
        });
        var gl = scene.gl;
        var buff = gl.createBuffer();
        if (!buff) {
            throw this.fatal('Not enough memory to create an array buffer!');
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
        this.buff = buff;
    };
    return BackgroundPainter;
}(Painter));
export default BackgroundPainter;
function getVert(align) {
    var x = '';
    var y = '';
    if (align.indexOf('B') !== -1) {
        y = 'location.y -= uniAspectRatio - 1.0;';
    }
    else if (align.indexOf('T') !== -1) {
        y = 'location.y += uniAspectRatio - 1.0;';
    }
    if (align.indexOf('R') !== -1) {
        x = 'location.x -= 1.0 / uniAspectRatio - 1.0;';
    }
    else if (align.indexOf('L') !== -1) {
        x = 'location.x += 1.0 / uniAspectRatio - 1.0;';
    }
    return "uniform float uniAspectRatio;\nattribute vec2 attXY;\nvarying vec2 varUV;\n\nvoid main() {\n  varUV = attXY;\n  vec2 location = 2.0 * (attXY - vec2(0.5, 0.5));\n\n  if (uniAspectRatio > 1.0) {\n    location.y *= uniAspectRatio;" + y + "\n  } else {\n    location.x /= uniAspectRatio;" + x + "\n  }\n\n  gl_Position = vec4(location.x, -location.y, 0.9999999, 1.0);\n}";
}
var FRAG = "precision mediump float;\nuniform sampler2D uniTexture;\nvarying vec2 varUV;\n\nvoid main() {\n  vec4 color = texture2D( uniTexture, varUV );\n  gl_FragColor = color;\n}";
//# sourceMappingURL=background.js.map