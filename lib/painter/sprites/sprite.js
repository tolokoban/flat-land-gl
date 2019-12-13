/**
 * Sprites management is complex because we must be able to add sprites
 * even for Painters that are not yet used in a Scene.
 */
import { __assign, __extends } from "tslib";
import Calc from '../../calc';
import VirtualSprite from "./virtual-sprite";
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite(id, data, update, destroy, params) {
        var _this = _super.call(this, id, data, update, destroy) || this;
        _this._params = params;
        return _this;
    }
    Object.defineProperty(Sprite.prototype, "x", {
        get: function () {
            return this._params.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "y", {
        get: function () {
            return this._params.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "z", {
        get: function () {
            return this._params.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () {
            return this._params.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () {
            return this._params.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originX", {
        get: function () {
            return this._params.originX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originY", {
        get: function () {
            return this._params.originY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u0", {
        get: function () {
            return this._params.u0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v0", {
        get: function () {
            return this._params.v0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u1", {
        get: function () {
            return this._params.u1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v1", {
        get: function () {
            return this._params.v1;
        },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.update = function (newParams) {
        if (newParams) {
            this._params = __assign(__assign({}, this._params), newParams);
        }
        var _a = this._params, x = _a.x, y = _a.y, z = _a.z, originX = _a.originX, originY = _a.originY, width = _a.width, height = _a.height, u0 = _a.u0, v0 = _a.v0, u1 = _a.u1, v1 = _a.v1, scale = _a.scale, angle = _a.angle;
        var xxA = -originX;
        var yyA = -originY;
        var xxB = xxA + width;
        var yyB = yyA;
        var xxC = xxA + width;
        var yyC = yyA + height;
        var xxD = xxA;
        var yyD = yyA + height;
        var xA = xxA * scale;
        var yA = yyA * scale;
        var xB = xxB * scale;
        var yB = yyB * scale;
        var xC = xxC * scale;
        var yC = yyC * scale;
        var xD = xxD * scale;
        var yD = yyD * scale;
        // tslint:disable-next-line:no-bitwise
        if ((angle | 0) !== 0) {
            var C = Calc.cos(angle);
            var S = Calc.sin(angle);
            xA = (xxA * C + yyA * S) * scale;
            yA = (yyA * C - xxA * S) * scale;
            xB = (xxB * C + yyB * S) * scale;
            yB = (yyB * C - xxB * S) * scale;
            xC = (xxC * C + yyC * S) * scale;
            yC = (yyC * C - xxC * S) * scale;
            xD = (xxD * C + yyD * S) * scale;
            yD = (yyD * C - xxD * S) * scale;
        }
        var data = this._data;
        // tslint:disable:no-magic-numbers
        data[0] = xA + x;
        data[1] = yA + y;
        data[2] = z;
        data[3] = u0;
        data[4] = v0;
        data[5] = xB + x;
        data[6] = yB + y;
        data[7] = z;
        data[8] = u1;
        data[9] = v0;
        data[10] = xC + x;
        data[11] = yC + y;
        data[12] = z;
        data[13] = u1;
        data[14] = v1;
        data[15] = xD + x;
        data[16] = yD + y;
        data[17] = z;
        data[18] = u0;
        data[19] = v1;
        // tslint:enable:no-magic-numbers
        this._update(this, data);
    };
    return Sprite;
}(VirtualSprite));
export default Sprite;
//# sourceMappingURL=sprite.js.map