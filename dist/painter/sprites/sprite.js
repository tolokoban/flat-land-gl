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
    function Sprite(index, data, params) {
        this.index = index;
        this.data = data;
        this.params = __assign({ x: 0, y: 0, z: 0, width: 50, height: 50, originX: 0, originY: 0, u0: 0, v0: 0, u1: 1, v1: 1 }, params);
    }
    Sprite.prototype.update = function (newParams) {
        this.params = __assign(__assign({}, this.params), newParams);
        var _a = this, data = _a.data, index = _a.index, params = _a.params;
        data[index] = params.x;
        data[index + 1] = params.y;
        data[index + 2] = params.z;
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