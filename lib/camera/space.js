import { __extends } from "tslib";
import Camera from "./camera";
import Calc from "../calc";
var HALF = 0.5;
var HALF_PI = Math.PI * HALF;
var ALMOST_HALF_PI = 1.570796326794896;
/**
 * Abstract camera for 3D space.
 */
var Space = /** @class */ (function (_super) {
    __extends(Space, _super);
    function Space() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cameraMatrix = new Float32Array(16);
        return _this;
    }
    /**
     * The camera looks at (targetX, targetY, targetZ)
     * and it is at a distance of `distance`.
     * That defines a sphere. We use `latitude` and `longitude` to know
     * where the camera lies on the sphere.
     * @param  latitude - Expressed in radians.
     * @param  longitude - Expressed in radians.
     */
    Space.prototype.orbit = function (targetX, targetY, targetZ, distance, latitude, longitude) {
        var lat = Calc.clamp(latitude, -ALMOST_HALF_PI, ALMOST_HALF_PI);
        var lng = longitude - HALF_PI;
        var cosLat = Math.cos(lat);
        var sinLat = Math.sin(lat);
        var cosLng = Math.cos(lng);
        var sinLng = Math.sin(lng);
        // Vecteur Z de la caméra.
        var Zx = cosLng * cosLat;
        var Zy = sinLat;
        var Zz = sinLng * cosLat;
        // Le vecteur X se déduit par un produit vectoriel de (0,1,0) avec Z.
        var Xx = -Zz;
        var Xy = 0;
        var Xz = Zx;
        // Comme (0,0,1) n'est pas orthogonal à Z, il faut normaliser X.
        var len = Math.sqrt(Xx * Xx + Xy * Xy + Xz * Xz);
        Xx /= len;
        Xy /= len;
        Xz /= len;
        // Y peut alors se déduire par le produit vectoriel de X par Z.
        // Et il n'y aura pas besoin de le normaliser.
        var Yx = Zz * Xy - Zy * Xz;
        var Yy = Xz * Zx - Xx * Zz;
        var Yz = Zy * Xx - Zx * Xy;
        // Translation.
        var Tx = -(Zx * distance + targetX);
        var Ty = -(Zy * distance + targetY);
        var Tz = -(Zz * distance + targetZ);
        // Le résultat est la multiplication de la projection avec la translation.
        var result = this.cameraMatrix;
        result[Calc.M4_00] = Xx;
        result[Calc.M4_01] = Xy;
        result[Calc.M4_02] = Xz;
        result[Calc.M4_03] = Tx * Xx + Ty * Xy + Tz * Xz;
        result[Calc.M4_10] = Yx;
        result[Calc.M4_11] = Yy;
        result[Calc.M4_12] = Yz;
        result[Calc.M4_13] = Tx * Yx + Ty * Yy + Tz * Yz;
        result[Calc.M4_20] = Zx;
        result[Calc.M4_21] = Zy;
        result[Calc.M4_22] = Zz;
        result[Calc.M4_23] = Tx * Zx + Ty * Zy + Tz * Zz;
        result[Calc.M4_30] = 0;
        result[Calc.M4_31] = 0;
        result[Calc.M4_32] = 0;
        result[Calc.M4_33] = 1;
    };
    return Space;
}(Camera));
export default Space;
//# sourceMappingURL=space.js.map