import Camera from "./camera"
import Calc from "../calc"

const HALF = 0.5
const HALF_PI = Math.PI * HALF
const ALMOST_HALF_PI = 1.570796326794896

/**
 * Abstract camera for 3D space.
 */
export default abstract class Space extends Camera {
    protected cameraMatrix = new Float32Array(16)

    /**
     * The camera looks at (targetX, targetY, targetZ)
     * and it is at a distance of `distance`.
     * That defines a sphere. We use `latitude` and `longitude` to know
     * where the camera lies on the sphere.
     * @param  latitude - Expressed in radians.
     * @param  longitude - Expressed in radians.
     */
    orbit(targetX: number, targetY: number, targetZ: number,
        distance: number, latitude: number, longitude: number) {
        const lat = Calc.clamp(latitude, -ALMOST_HALF_PI, ALMOST_HALF_PI)
        const lng = longitude - HALF_PI
        const cosLat = Math.cos(lat)
        const sinLat = Math.sin(lat)
        const cosLng = Math.cos(lng)
        const sinLng = Math.sin(lng)
        // Vecteur Z de la caméra.
        const Zx = cosLng * cosLat
        const Zy = sinLat
        const Zz = sinLng * cosLat
        // Le vecteur X se déduit par un produit vectoriel de (0,1,0) avec Z.
        let Xx = -Zz;
        let Xy = 0;
        let Xz = Zx;
        // Comme (0,0,1) n'est pas orthogonal à Z, il faut normaliser X.
        const len = Math.sqrt(Xx * Xx + Xy * Xy + Xz * Xz);
        Xx /= len;
        Xy /= len;
        Xz /= len;
        // Y peut alors se déduire par le produit vectoriel de X par Z.
        // Et il n'y aura pas besoin de le normaliser.
        const Yx = Zz * Xy - Zy * Xz
        const Yy = Xz * Zx - Xx * Zz
        const Yz = Zy * Xx - Zx * Xy
        // Translation.
        const Tx = -(Zx * distance + targetX);
        const Ty = -(Zy * distance + targetY);
        const Tz = -(Zz * distance + targetZ);

        // Le résultat est la multiplication de la projection avec la translation.
        const result = this.cameraMatrix

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
    }
}
