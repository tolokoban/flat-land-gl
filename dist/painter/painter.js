/**
 * This is a virtual painter from which all the other will inherit.
 */
var Painter = /** @class */ (function () {
    function Painter(_name, scene) {
        this._name = _name;
        this.scene = scene;
    }
    Object.defineProperty(Painter.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Painter.prototype.render = function (time) { };
    return Painter;
}());
export default Painter;
//# sourceMappingURL=painter.js.map