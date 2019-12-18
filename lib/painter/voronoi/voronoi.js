import { __assign, __extends } from "tslib";
import Painter from '../painter';
import Vert from './voronoi.vert';
import Frag from './voronoi.frag';
var NB_VERTICES_IN_SQUARE = 4;
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
    function VoronoiPainter(params) {
        var _this = _super.call(this) || this;
        _this.params = __assign({ seeds: randomArray(20), colors: randomArray(20), border: 0, light: 0, scaleX: 1, scaleY: 1 }, params);
        if (_this.params.seeds.length % 3 !== 0) {
            throw Error("The length of \"seeds\" must be an integral multiple of 3!");
        }
        if (_this.params.seeds.length !== _this.params.colors.length) {
            throw Error("\"seeds\" and \"colors\" must have the same length!");
        }
        _this.seeds = new Float32Array(_this.params.seeds);
        _this.colors = new Float32Array(_this.params.colors);
        return _this;
    }
    VoronoiPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, buff = _a.buff;
        if (!scene || !prg || !buff) {
            return;
        }
        var _b = this.params, border = _b.border, scaleX = _b.scaleX, scaleY = _b.scaleY;
        var thickness = border;
        var gl = scene.gl;
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        prg.setUniform("uniSeeds", this.seeds);
        prg.setUniform("uniColors", this.colors);
        prg.setUniform("uniLight", this.params.light);
        prg.setUniform("uniThickness", thickness);
        prg.setUniform("uniScaleX", scaleX);
        prg.setUniform("uniScaleY", scaleY);
        prg.bindAttribs(buff, 'attXY');
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, NB_VERTICES_IN_SQUARE);
    };
    /*
        private getSeeds(time: number) {
            const { lastTime } = this;
            let alpha = (time - lastTime) / DURATION
            if (alpha > 3) {
                this.lastTime = time
                this.seeds0 = this.seeds1
                this.seeds1 = randomArray()
                alpha = 0
            }
            alpha = Math.min(alpha, 1)
    
            const mix = []
            const { seeds0, seeds1 } = this
            const beta = 1 - alpha
            for (let i = 0; i < seeds1.length; i++) {
                mix.push(beta * seeds0[i] + alpha * seeds1[i])
            }
            return new Float32Array(mix)
        }
    */
    VoronoiPainter.prototype.destroy = function (scene) {
        var gl = scene.gl;
        var buff = this.buff;
        if (!buff) {
            return;
        }
        gl.deleteBuffer(buff);
    };
    VoronoiPainter.prototype.initialize = function (scene) {
        this.prg = this.createProgram({
            frag: Frag,
            vert: Vert,
        }, {
            count: "const int COUNT = " + this.params.seeds.length + ";"
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
function randomArray(count) {
    var arr = [];
    for (var i = 0; i < 3 * count; i++) {
        arr.push(Math.random());
    }
    return arr;
}
//# sourceMappingURL=voronoi.js.map