/**
 * Fill the screen with a tilable voronoi pattern.
 */
import { __extends } from "tslib";
import Painter from '../painter';
import Vert from './voronoi.vert';
import Frag from './voronoi.frag';
//import { IUniforms } from '../../types'
var NB_VERTICES_IN_SQUARE = 4;
var DURATION = 7000;
var VoronoiPainter = /** @class */ (function (_super) {
    __extends(VoronoiPainter, _super);
    /**
     * params: { atlas, align }
     * - align: if undefined, the voronoi will be centered.
     *          "R" means that the Right edge of the voronoi is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    function VoronoiPainter( /*private readonly params: IVoronoiPainterParams*/) {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        _this.seeds0 = new Float32Array(randomArray());
        _this.seeds1 = new Float32Array(randomArray());
        return _this;
    }
    VoronoiPainter.prototype.render = function (time) {
        var _a = this, scene = _a.scene, prg = _a.prg, buff = _a.buff;
        if (!scene || !prg || !buff) {
            return;
        }
        var gl = scene.gl;
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        prg.setUniform("uniSeeds", this.getSeeds(time));
        prg.bindAttribs(buff, 'attXY');
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, NB_VERTICES_IN_SQUARE);
    };
    VoronoiPainter.prototype.getSeeds = function (time) {
        var lastTime = this.lastTime;
        var alpha = (time - lastTime) / DURATION;
        if (alpha > 1.5) {
            this.lastTime = time;
            this.seeds0 = this.seeds1;
            this.seeds1 = randomArray();
            alpha = 0;
        }
        alpha = Math.min(alpha, 1);
        var mix = [];
        var _a = this, seeds0 = _a.seeds0, seeds1 = _a.seeds1;
        var beta = 1 - alpha;
        for (var i = 0; i < seeds1.length; i++) {
            mix.push(beta * seeds0[i] + alpha * seeds1[i]);
        }
        return new Float32Array(mix);
    };
    VoronoiPainter.prototype.destroy = function (scene) {
        var gl = scene.gl;
        var buff = this.buff;
        if (!buff) {
            return;
        }
        gl.deleteBuffer(buff);
    };
    VoronoiPainter.prototype.initialize = function (scene) {
        //const { params } = this
        this.prg = this.createProgram({
            frag: Frag,
            vert: Vert,
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
    return VoronoiPainter;
}(Painter));
export default VoronoiPainter;
function randomArray() {
    var arr = [];
    for (var i = 0; i < 60; i++) {
        arr.push(Math.random());
    }
    return new Float32Array(arr);
}
//# sourceMappingURL=voronoi.js.map