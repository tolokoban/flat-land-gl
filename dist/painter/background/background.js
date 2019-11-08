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
 * Background the screen by filling it with an image that covers it entirely.
 */
import Painter from '../painter';
var BackgroundPainter = /** @class */ (function (_super) {
    __extends(BackgroundPainter, _super);
    function BackgroundPainter(name, scene, params) {
        var _this = _super.call(this, name, scene) || this;
        var atlasName = params.atlasName;
        var atlas = scene.getAtlas(atlasName);
        if (!atlas) {
            throw _this.fatal("Atlas \"" + atlasName + "\" not found!");
        }
        _this.atlas = atlas;
        _this.prg = _this.createProgram({
            vert: VERT, frag: FRAG
        });
        var gl = scene.gl;
        var buff = gl.createBuffer();
        if (!buff) {
            throw _this.fatal("Not enough memory to create an array buffer!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0, 0, 1, 1, 0, 1, 1
        ]), gl.STATIC_DRAW);
        _this.buff = buff;
        return _this;
    }
    BackgroundPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, atlas = _a.atlas, buff = _a.buff;
        var gl = scene.gl;
        gl.disable(gl.DEPTH_TEST);
        prg.use();
        atlas.activate();
        var uniforms = prg;
        uniforms.$uniTexture = 0;
        prg.setUniform("uniAspectRatio", scene.width / scene.height);
        prg.bindAttribs(buff, "attXY");
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    return BackgroundPainter;
}(Painter));
export default BackgroundPainter;
var VERT = "uniform float uniAspectRatio;\nattribute vec2 attXY;\nvarying vec2 varUV;\n\nvoid main() {\n  varUV = attXY;\n  vec2 location = 2.0 * (attXY - vec2(0.5, 0.5));\n\n  if (uniAspectRatio > 1.0) {\n    location.y *= uniAspectRatio;\n  } else {\n    location.x /= uniAspectRatio;\n  }\n\n  gl_Position = vec4(location.x, -location.y, -1.0, 1.0);\n}";
var FRAG = "precision mediump float;\nuniform sampler2D uniTexture;\nvarying vec2 varUV;\n\nvoid main() {\n  vec4 color = texture2D( uniTexture, varUV );\n  gl_FragColor = color;\n}";
//# sourceMappingURL=background.js.map