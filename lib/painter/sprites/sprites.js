import { __assign, __extends, __read, __values } from "tslib";
import Painter from '../painter';
import Sprite from './sprite';
import frag from './sprites.frag';
import vert from './sprites.vert';
// Allocations will be done by pieces of BLOCK Sprites.
var BLOCK = 64;
var NB_ATTRIBS = 6; // attXYZ and attUV and attAngle.
var NB_CORNERS = 4;
var CHUNK = NB_ATTRIBS * NB_CORNERS;
var DEFAULT_WIDTH = 64;
var DEFAULT_HEIGHT = 64;
var HALF = 0.5;
var globalID = 1;
var SpritesPainter = /** @class */ (function (_super) {
    __extends(SpritesPainter, _super);
    function SpritesPainter(params) {
        var _this = _super.call(this) || this;
        _this._capacity = BLOCK;
        _this._dataVert = new Float32Array(BLOCK * CHUNK);
        // We need to keep track of all the inserted sprites because when we want to destroy
        // one, we wnat to exchange its position with the one at the end of the list for
        // optimisation purpose.
        _this._sprites = [];
        _this._update = function (sprite, data) {
            if (!_this.scene) {
                // If this painter has not yet been initialized, then update has to be defered.
                _this._deferedSpritesUpdate.set(sprite.id, [sprite, data]);
                return;
            }
            if (sprite.$index < 0) {
                _this._allocate(sprite);
            }
            _this._dataVert.set(data, CHUNK * sprite.$index);
        };
        /**
         * Only called by an instance os Sprite.
         */
        _this._destroy = function (sprite) {
            var lastSprite = _this._sprites.pop();
            if (!lastSprite) {
                console.error("You tried to destroy a Sprite that is not owned by this painter!", sprite);
                return;
            }
            var indexOfLastSprite = lastSprite.$index;
            if (indexOfLastSprite !== sprite.$index) {
                // Swap positions of destroyed sprite and last sprite in the list.
                lastSprite.$index = sprite.$index;
                _this._sprites[lastSprite.$index] = lastSprite;
                lastSprite.update();
            }
            sprite.$index = -1;
        };
        _this._atlas = params.atlas;
        _this._deferedSpritesUpdate = new Map();
        return _this;
    }
    Object.defineProperty(SpritesPainter.prototype, "atlas", {
        get: function () {
            return this._atlas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpritesPainter.prototype, "count", {
        get: function () {
            return this._sprites.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register a new sprite that will be immediatly visible.
     */
    SpritesPainter.prototype.create = function (params) {
        var atlas = this.atlas;
        var width = atlas.width || DEFAULT_WIDTH;
        var height = atlas.height || DEFAULT_HEIGHT;
        var data = new Float32Array(CHUNK);
        var sprite = new Sprite("" + globalID++, data, this._update, this._destroy, __assign({ x: 0, y: 0, z: 0, width: width, height: height, originX: width * HALF, originY: width * HALF, u0: 0, v0: 0, u1: 1, v1: 1, scale: 1, angle: 0 }, params));
        sprite.update();
        return sprite;
    };
    /**
     * Only called by an instance os Sprite.
     */
    SpritesPainter.prototype._allocate = function (sprite) {
        if (this._capacity <= this.count) {
            this._allocateNewBlock();
        }
        sprite.$index = this.count;
        this._sprites.push(sprite);
    };
    /**
     * When the number of sprites exceeds the current capacity, we must allocate a new BLOCK.
     * This function cannot be called before painter initialization.
     */
    SpritesPainter.prototype._allocateNewBlock = function () {
        this._capacity += BLOCK;
        var _a = this, scene = _a.scene, _buffElem = _a._buffElem;
        if (!scene) {
            throw Error('No scene!');
        }
        if (!_buffElem) {
            throw Error('No buffElem!');
        }
        var gl = scene.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _buffElem);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(this._capacity), gl.DYNAMIC_DRAW);
        var dataVert = new Float32Array(this._capacity * CHUNK);
        dataVert.set(this._dataVert);
        this._dataVert = dataVert;
    };
    SpritesPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, _prg = _a._prg, atlas = _a.atlas, _buffVert = _a._buffVert, _buffElem = _a._buffElem;
        if (!scene || !_prg || !atlas || !_buffVert || !_buffElem) {
            return;
        }
        var gl = scene.gl;
        // Update sprites' attributes.
        gl.bindBuffer(gl.ARRAY_BUFFER, _buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, this._dataVert, gl.DYNAMIC_DRAW);
        gl.enable(gl.DEPTH_TEST);
        _prg.use();
        atlas.activate();
        var uniforms = _prg;
        uniforms.$uniTexture = 0;
        uniforms.$uniWidth = scene.width;
        uniforms.$uniHeight = scene.height;
        _prg.bindAttribs(_buffVert, 'attXYZ', 'attUV');
        gl.bindBuffer(gl.ARRAY_BUFFER, _buffVert);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _buffElem);
        gl.drawElements(gl.TRIANGLES, NB_ATTRIBS * this.count, gl.UNSIGNED_SHORT, 0);
    };
    SpritesPainter.prototype.initialize = function (scene) {
        this._prg = this.createProgram({ vert: vert, frag: frag });
        var gl = scene.gl;
        var buffVert = gl.createBuffer();
        if (!buffVert) {
            throw this.fatal('Not enough memory to create an array buffer!');
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, this._dataVert, gl.DYNAMIC_DRAW);
        this._buffVert = buffVert;
        var buffElem = gl.createBuffer();
        if (!buffElem) {
            throw this.fatal('Not enough memory to create an array buffer!');
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(BLOCK), gl.DYNAMIC_DRAW);
        this._buffElem = buffElem;
        this.manageDeferedSpritesUpdates();
    };
    SpritesPainter.prototype.destroy = function () {
        var _a = this, scene = _a.scene, _buffVert = _a._buffVert, _buffElem = _a._buffElem;
        if (!scene || !_buffVert || !_buffElem) {
            return;
        }
        var gl = scene.gl;
        gl.deleteBuffer(_buffVert);
        gl.deleteBuffer(_buffElem);
    };
    SpritesPainter.prototype.manageDeferedSpritesUpdates = function () {
        var e_1, _a;
        if (this._deferedSpritesUpdate.size === 0) {
            // Nothing to do.
            return;
        }
        try {
            for (var _b = __values(this._deferedSpritesUpdate.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                var _d = __read(item, 2), sprite = _d[0], data = _d[1];
                this._update(sprite, data);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return SpritesPainter;
}(Painter));
export default SpritesPainter;
var CORNER_B = 1;
var CORNER_C = 2;
var CORNER_D = 3;
/**
 * A--B
 * |  |
 * D--C
 */
function createElements(capacity) {
    var dataElem = new Uint16Array(NB_ATTRIBS * capacity);
    var i = 0;
    var a = 0;
    for (var k = 0; k < capacity; k++) {
        var b = a + CORNER_B;
        var c = a + CORNER_C;
        var d = a + CORNER_D;
        // tslint:disable:no-magic-numbers
        dataElem[i + 0] = a;
        dataElem[i + 1] = d;
        dataElem[i + 2] = b;
        dataElem[i + 3] = b;
        dataElem[i + 4] = d;
        dataElem[i + 5] = c;
        // tslint:enable:no-magic-numbers
        a += NB_CORNERS;
        i += NB_ATTRIBS;
    }
    return dataElem;
}
//# sourceMappingURL=sprites.js.map