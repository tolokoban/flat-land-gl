import Camera from "./camera";
/**
 * Abstract camera for 3D space.
 */
export default abstract class Space extends Camera {
    protected cameraMatrix: Float32Array;
    /**
     * The camera looks at (targetX, targetY, targetZ)
     * and it is at a distance of `distance`.
     * That defines a sphere. We use `latitude` and `longitude` to know
     * where the camera lies on the sphere.
     * @param  latitude - Expressed in radians.
     * @param  longitude - Expressed in radians.
     */
    orbit(targetX: number, targetY: number, targetZ: number, distance: number, latitude: number, longitude: number): void;
}
