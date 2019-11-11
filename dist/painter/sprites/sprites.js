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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 *
 */
import Painter from '../painter';
import Sprite from './sprite';
import vert from './sprites.vert';
import frag from './sprites.frag';
// Allocations will be done by pieces of BLOCK Sprites.
var BLOCK = 64;
var NB_ATTRIBS = 5; // attXYZ and attUV.
var NB_CORNERS = 4;
var CHUNK = NB_ATTRIBS * NB_CORNERS;
var SpritesPainter = /** @class */ (function (_super) {
    __extends(SpritesPainter, _super);
    function SpritesPainter(params) {
        var _this = _super.call(this, params) || this;
        _this.dataVert = new Float32Array(BLOCK * CHUNK);
        _this.sprites = [];
        _this.count = 0;
        _this.capacity = BLOCK;
        /**
         * Since the vertex array can be reallocated, we cannot give a reference to the Float32Array
         * to any Sprite. Instead, we will give them this function that will return the current array.
         */
        _this.getData = function () { return _this.dataVert; };
        var scene = params.scene, atlas = params.atlas;
        var atlasObj = scene.getAtlas(atlas);
        if (!atlasObj) {
            throw _this.fatal("Atlas \"" + atlas + "\" not found!");
        }
        _this.atlas = atlasObj;
        _this.prg = _this.createProgram({ vert: vert, frag: frag });
        var gl = scene.gl;
        var buffVert = gl.createBuffer();
        if (!buffVert) {
            throw _this.fatal("Not enough memory to create an array buffer!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, _this.dataVert, gl.DYNAMIC_DRAW);
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
    SpritesPainter.prototype.createSprite = function (params) {
        var index = this.count * CHUNK;
        this.count++;
        var _a = this.atlas, width = _a.width, height = _a.height;
        var sprite = new Sprite(index, this.getData, __assign({ width: width,
            height: height }, params));
        this.sprites.push(sprite);
        console.info("this.dataVert=", this.dataVert);
        return sprite;
    };
    SpritesPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, atlas = _a.atlas, buffVert = _a.buffVert, buffElem = _a.buffElem;
        var gl = scene.gl;
        // Update sprites' attributes.
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, this.dataVert, gl.DYNAMIC_DRAW);
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
        a += 4;
        i += 6;
    }
    return dataElem;
}
//# sourceMappingURL=sprites.js.map