var Sprite = /** @class */ (function () {
    function Sprite(index, params) {
        this.index = index;
        this.dirty = false;
        this.data = {
            x: 0, y: 0, z: 0,
            width: 50, height: 50,
            originX: 0, originY: 0,
            u0: 0, v0: 0, u1: 1, v1: 1
        };
    }
    Sprite.prototype.update = function (array) {
    };
    Object.defineProperty(Sprite.prototype, "x", {
        get: function () { return this.data.x; },
        set: function (v) {
            this.data.x = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "y", {
        get: function () { return this.data.y; },
        set: function (v) {
            this.data.y = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "z", {
        get: function () { return this.data.z; },
        set: function (v) {
            this.data.z = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () { return this.data.width; },
        set: function (v) {
            this.data.width = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () { return this.data.height; },
        set: function (v) {
            this.data.height = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originX", {
        get: function () { return this.data.originX; },
        set: function (v) {
            this.data.originX = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originY", {
        get: function () { return this.data.originY; },
        set: function (v) {
            this.data.originY = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u0", {
        get: function () { return this.data.u0; },
        set: function (v) {
            this.data.u0 = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v0", {
        get: function () { return this.data.v0; },
        set: function (v) {
            this.data.v0 = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u1", {
        get: function () { return this.data.u1; },
        set: function (v) {
            this.data.u1 = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v1", {
        get: function () { return this.data.v1; },
        set: function (v) {
            this.data.v1 = v;
            this.dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    return Sprite;
}());
export default Sprite;
//# sourceMappingURL=sprite.js.map