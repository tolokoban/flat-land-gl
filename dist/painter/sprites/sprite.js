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
var Sprite = /** @class */ (function () {
    function Sprite(index, getData, params) {
        this.getData = getData;
        this.extra = {};
        this.$index = 0;
        this.$index = index;
        var width = params.width || 50;
        var height = params.height || 50;
        this.params = __assign({ x: 0, y: 0, z: 0, width: width, height: height, originX: width / 2, originY: height / 2, u0: 0, v0: 0, u1: 1, v1: 1, scale: 1 }, params);
        this.update(this.params);
    }
    Sprite.prototype.update = function (newParams) {
        this.params = __assign(__assign({}, this.params), newParams);
        var _a = this, getData = _a.getData, $index = _a.$index, params = _a.params;
        var data = getData();
        var x = params.x, y = params.y, z = params.z, originX = params.originX, originY = params.originY, width = params.width, height = params.height, u0 = params.u0, v0 = params.v0, u1 = params.u1, v1 = params.v1, scale = params.scale;
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
        data[$index + 0] = xA + x;
        data[$index + 1] = yA + y;
        data[$index + 2] = z;
        data[$index + 3] = u0;
        data[$index + 4] = v0;
        data[$index + 5] = xB + x;
        data[$index + 6] = yB + y;
        data[$index + 7] = z;
        data[$index + 8] = u1;
        data[$index + 9] = v0;
        data[$index + 10] = xC + x;
        data[$index + 11] = yC + y;
        data[$index + 12] = z;
        data[$index + 13] = u1;
        data[$index + 14] = v1;
        data[$index + 15] = xD + x;
        data[$index + 16] = yD + y;
        data[$index + 17] = z;
        data[$index + 18] = u0;
        data[$index + 19] = v1;
    };
    Object.defineProperty(Sprite.prototype, "x", {
        get: function () { return this.params.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "y", {
        get: function () { return this.params.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "z", {
        get: function () { return this.params.z; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () { return this.params.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () { return this.params.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originX", {
        get: function () { return this.params.originX; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originY", {
        get: function () { return this.params.originY; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u0", {
        get: function () { return this.params.u0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v0", {
        get: function () { return this.params.v0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u1", {
        get: function () { return this.params.u1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v1", {
        get: function () { return this.params.v1; },
        enumerable: true,
        configurable: true
    });
    return Sprite;
}());
export default Sprite;
//# sourceMappingURL=sprite.js.map