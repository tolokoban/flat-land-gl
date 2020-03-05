import Camera from "./camera"

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
        const cosLat = Math.cos(latitude);
        const sinLat = Math.sin(latitude);
        const cosLng = -Math.cos(longitude + Math.PI * .5);
        const sinLng = -Math.sin(longitude + Math.PI * .5);
        // Vecteur Z de la caméra.
        const Zx = cosLng * cosLat;
        const Zy = sinLng * cosLat;
        const Zz = sinLat; // V2/2
        // Le vecteur X se déduit par un produit vectoriel de (0,0,1) avec Z.
        let Xx = -Zy;
        let Xy = Zx;
        let Xz = 0;
        // Comme (0,0,1) n'est pas orthogonal à Z, il faut normaliser X.
        var len = Math.sqrt(Xx * Xx + Xy * Xy + Xz * Xz);
        Xx /= len;
        Xy /= len;
        Xz /= len;
        // Y peut alors se déduire par le produit vectoriel de Z par X.
        // Et il n'y aura pas besoin de le normaliser.
        const Yx = Zy * Xz - Zz * Xy;
        const Yy = Xx * Zz - Xz * Zx;
        const Yz = Zx * Xy - Zy * Xx;
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
