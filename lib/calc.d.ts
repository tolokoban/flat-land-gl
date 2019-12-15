declare const _default: {
    cos: typeof cos;
    sin: typeof sin;
    clamp: typeof clamp;
};
export default _default;
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
