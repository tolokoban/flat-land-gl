// tslint:disable:no-bitwise
var FULL_TURN = 4096;
var MODULO = FULL_TURN - 1;
var HALF_TURN = 2048;
var COS = new Float32Array(FULL_TURN);
var SIN = new Float32Array(FULL_TURN);
// Prepare acceleration table for COS and SIN.
for (var i = 0; i < FULL_TURN; i++) {
    var angle = (Math.PI * i) / HALF_TURN;
    COS[i] = Math.cos(angle);
    SIN[i] = Math.sin(angle);
}
export default { cos: cos, sin: sin };
/**
 * Fast cosine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function cos(angle) {
    return COS[(angle | 0) & MODULO];
}
/**
 * Fast sine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function sin(angle) {
    return SIN[(angle | 0) & MODULO];
}
//# sourceMappingURL=calc.js.map