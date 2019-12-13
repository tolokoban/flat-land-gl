/**
 * Quads are actually any kind of quadrilaters.
 * Each corner has 5 attributes:
 * - x, y, z: space coords.
 * - u, v: atlas coords.
 *
 * They are suffixed with:
 * - TL: Top Left corner.
 * - TR: Top Right corner.
 * - BR: Bottom Right corner.
 * - BL: Bottom Left corner.
 */
import { __assign, __extends } from "tslib";
import VirtualSprite from "./virtual-sprite";
var Quad = /** @class */ (function (_super) {
    __extends(Quad, _super);
    function Quad(id, data, update, destroy, params) {
        var _this = _super.call(this, id, data, update, destroy) || this;
        _this._params = params;
        return _this;
    }
    Quad.prototype.update = function (newParams) {
        if (newParams) {
            this._params = __assign(__assign({}, this._params), newParams);
        }
        var _a = this._params, xTL = _a.xTL, yTL = _a.yTL, zTL = _a.zTL, uTL = _a.uTL, vTL = _a.vTL, xTR = _a.xTR, yTR = _a.yTR, zTR = _a.zTR, uTR = _a.uTR, vTR = _a.vTR, xBR = _a.xBR, yBR = _a.yBR, zBR = _a.zBR, uBR = _a.uBR, vBR = _a.vBR, xBL = _a.xBL, yBL = _a.yBL, zBL = _a.zBL, uBL = _a.uBL, vBL = _a.vBL;
        var data = this._data;
        // tslint:disable:no-magic-numbers
        data[0] = xTL;
        data[1] = yTL;
        data[2] = zTL;
        data[3] = uTL;
        data[4] = vTL;
        data[5] = xTR;
        data[6] = yTR;
        data[7] = zTR;
        data[8] = uTR;
        data[9] = vTR;
        data[10] = xBR;
        data[11] = yBR;
        data[12] = zBR;
        data[13] = uBR;
        data[14] = vBR;
        data[15] = xBL;
        data[16] = yBL;
        data[17] = zBL;
        data[18] = uBL;
        data[19] = vBL;
        // tslint:enable:no-magic-numbers
        this._update(this, data);
    };
    return Quad;
}(VirtualSprite));
export default Quad;
//# sourceMappingURL=quad.js.map