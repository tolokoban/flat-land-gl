var VirtualSprite = /** @class */ (function () {
    function VirtualSprite(id, data, update, destroy) {
        this.$index = -1;
        this.extra = {};
        this._id = id;
        this._data = data;
        this._update = update;
        this._destroy = destroy;
    }
    Object.defineProperty(VirtualSprite.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    VirtualSprite.prototype.destroy = function () { this._destroy(this); };
    return VirtualSprite;
}());
export default VirtualSprite;
//# sourceMappingURL=virtual-sprite.js.map