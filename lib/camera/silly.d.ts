import Camera from "./camera";
/**
 * This Camera is silly because it does not transform coordinates.
 */
export default class Silly extends Camera {
    get glslUniforms(): {};
    get glslFunction(): string;
    setUniformValues(): void;
}
