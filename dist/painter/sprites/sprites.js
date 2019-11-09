var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 */
import Painter from '../painter';
import vert from './sprites.vert';
import frag from './sprites.frag';
// Allocations will be done by pieces of BLOCK Sprites.
var BLOCK = 64;
var NB_ATTRIBS = 5; // attXYZ and attUV.
var NB_CORNERS = 4;
var SpritesPainter = /** @class */ (function (_super) {
    __extends(SpritesPainter, _super);
    function SpritesPainter(name, scene, params) {
        var _this = _super.call(this, name, scene) || this;
        _this.count = 0;
        _this.capacity = BLOCK;
        var atlasName = params.atlasName;
        var atlas = scene.getAtlas(atlasName);
        if (!atlas) {
            throw _this.fatal("Atlas \"" + atlasName + "\" not found!");
        }
        _this.atlas = atlas;
        _this.prg = _this.createProgram({ vert: vert, frag: frag });
        var gl = scene.gl;
        var buffVert = gl.createBuffer();
        if (!buffVert) {
            throw _this.fatal("Not enough memory to create an array buffer!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(NB_ATTRIBS * NB_CORNERS * BLOCK), gl.DYNAMIC_DRAW);
        _this.buffVert = buffVert;
        var buffElem = gl.createBuffer();
        if (!buffElem) {
            throw _this.fatal("Not enough memory to create an array buffer!");
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(BLOCK), gl.DYNAMIC_DRAW);
        _this.buffElem = buffElem;
        return _this;
    }
    SpritesPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, atlas = _a.atlas, buffVert = _a.buffVert, buffElem = _a.buffElem;
        var gl = scene.gl;
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        atlas.activate();
        var uniforms = prg;
        uniforms.$uniTexture = 0;
        uniforms.$uniWidth = scene.width;
        uniforms.$uniHeight = scene.height;
        prg.bindAttribs(buffVert, "attXYZ", "attUV");
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem);
        gl.drawElements(gl.TRIANGLES, 6 * this.count, gl.UNSIGNED_SHORT, 0);
    };
    return SpritesPainter;
}(Painter));
export default SpritesPainter;
/**
 * A--B
 * |  |
 * D--C
 */
function createElements(capacity) {
    var dataElem = new Uint16Array(6 * capacity);
    var i = 0;
    var a = 0;
    for (var k = 0; k < capacity; k++) {
        var b = a + 1;
        var c = a + 2;
        var d = a + 3;
        dataElem[i + 0] = a;
        dataElem[i + 1] = d;
        dataElem[i + 2] = b;
        dataElem[i + 3] = b;
        dataElem[i + 4] = d;
        dataElem[i + 5] = c;
        a++;
        i += 6;
    }
    return dataElem;
}
//# sourceMappingURL=sprites.js.map