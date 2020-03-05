import { __extends } from "tslib";
import Camera from "./camera";
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
        var cosLat = Math.cos(latitude);
        var sinLat = Math.sin(latitude);
        var cosLng = -Math.cos(longitude + Math.PI * .5);
        var sinLng = -Math.sin(longitude + Math.PI * .5);
        // Vecteur Z de la caméra.
        var Zx = cosLng * cosLat;
        var Zy = sinLng * cosLat;
        var Zz = sinLat; // V2/2
        // Le vecteur X se déduit par un produit vectoriel de (0,0,1) avec Z.
        var Xx = -Zy;
        var Xy = Zx;
        var Xz = 0;
        // Comme (0,0,1) n'est pas orthogonal à Z, il faut normaliser X.
        var len = Math.sqrt(Xx * Xx + Xy * Xy + Xz * Xz);
        Xx /= len;
        Xy /= len;
        Xz /= len;
        // Y peut alors se déduire par le produit vectoriel de Z par X.
        // Et il n'y aura pas besoin de le normaliser.
        var Yx = Zy * Xz - Zz * Xy;
        var Yy = Xx * Zz - Xz * Zx;
        var Yz = Zx * Xy - Zy * Xx;
        // Translation.
        var Tx = -(Zx * distance + targetX);
        var Ty = -(Zy * distance + targetY);
        var Tz = -(Zz * distance + targetZ);
        // Le résultat est la multiplication de la projection avec la translation.
        var result = this.cameraMatrix;
        result[0] = Xx;
        result[4] = Xy;
        result[8] = Xz;
        result[12] = Tx * Xx + Ty * Xy + Tz * Xz;
        result[1] = Yx;
        result[5] = Yy;
        result[9] = Yz;
        result[13] = Tx * Yx + Ty * Yy + Tz * Yz;
        result[2] = Zx;
        result[6] = Zy;
        result[10] = Zz;
        result[14] = Tx * Zx + Ty * Zy + Tz * Zz;
        result[3] = 0;
        result[7] = 0;
        result[11] = 0;
        result[15] = 1;
    };
    return Space;
}(Camera));
export default Space;
//# sourceMappingURL=space.js.map