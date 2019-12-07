declare const _default: {
    cos: typeof cos;
    sin: typeof sin;
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
