/**
 * Fast cosine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
declare function cos(angle: number): number;
/**
 * Fast sine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
declare function sin(angle: number): number;
/**
 * Force a number to stay between two bounds.
 */
declare function clamp(v: number, min?: number, max?: number): number;
declare const _default: {
    cos: typeof cos;
    sin: typeof sin;
    clamp: typeof clamp;
    vector: {
        /**
         * @return Length of a 3D vector.
         */
        length3(input: Float32Array): number;
        /**
         * Create a 3D vector with length 1.
         */
        normalize3(input: Float32Array, output: Float32Array): void;
        /**
         * @return Length of a 3D vector.
         */
        length4(input: Float32Array): number;
        /**
         * Create a 3D vector with length 1.
         */
        normalize4(input: Float32Array, output: Float32Array): void;
    };
    matrix: {
        identity3(output: Float32Array): void;
        multiply3(a: Float32Array, b: Float32Array, output: Float32Array): void;
        identity4(output: Float32Array): void;
    };
    M4_00: number;
    M4_10: number;
    M4_20: number;
    M4_30: number;
    M4_01: number;
    M4_11: number;
    M4_21: number;
    M4_31: number;
    M4_02: number;
    M4_12: number;
    M4_22: number;
    M4_32: number;
    M4_03: number;
    M4_13: number;
    M4_23: number;
    M4_33: number;
    M3_00: number;
    M3_10: number;
    M3_20: number;
    M3_01: number;
    M3_11: number;
    M3_21: number;
    M3_02: number;
    M3_12: number;
    M3_22: number;
};
export default _default;
