// tslint:disable:no-bitwise
import { __read } from "tslib";
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
/**
 * Force a number to stay between two bounds.
 */
function clamp(v, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    if (v < min)
        return min;
    if (v > max)
        return max;
    return v;
}
var M4_00 = 0;
var M4_10 = 1;
var M4_20 = 2;
var M4_30 = 3;
var M4_01 = 4;
var M4_11 = 5;
var M4_21 = 6;
var M4_31 = 7;
var M4_02 = 8;
var M4_12 = 9;
var M4_22 = 10;
var M4_32 = 11;
var M4_03 = 12;
var M4_13 = 13;
var M4_23 = 14;
var M4_33 = 15;
var M3_00 = 0;
var M3_10 = 1;
var M3_20 = 2;
var M3_01 = 3;
var M3_11 = 4;
var M3_21 = 5;
var M3_02 = 6;
var M3_12 = 7;
var M3_22 = 8;
var vector = {
    /**
     * @return Length of a 3D vector.
     */
    length3: function (input) {
        var _a = __read(input, 3), x = _a[0], y = _a[1], z = _a[2];
        return Math.sqrt(x * x + y * y + z * z);
    },
    /**
     * Create a 3D vector with length 1.
     */
    normalize3: function (input, output) {
        var len = vector.length3(input);
        output[0] = input[0] * len;
        output[1] = input[1] * len;
        output[2] = input[2] * len;
    },
    /**
     * @return Length of a 3D vector.
     */
    length4: function (input) {
        var _a = __read(input, 4), x = _a[0], y = _a[1], z = _a[2], w = _a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    },
    /**
     * Create a 3D vector with length 1.
     */
    normalize4: function (input, output) {
        var len = vector.length4(input);
        output[0] = input[0] * len;
        output[1] = input[1] * len;
        output[2] = input[2] * len;
        output[3] = input[3] * len;
    }
};
var matrix = {
    identity3: function (output) {
        output[M3_00] = 1;
        output[M3_10] = 0;
        output[M3_20] = 0;
        output[M3_01] = 0;
        output[M3_11] = 1;
        output[M3_21] = 0;
        output[M3_02] = 0;
        output[M3_12] = 0;
        output[M3_22] = 1;
    },
    multiply3: function (a, b, output) {
        output[M3_00] = a[M3_00] * b[M3_00] + a[M3_01] * b[M3_10] + a[M3_02] * b[M3_20];
        output[M3_10] = a[M3_10] * b[M3_00] + a[M3_11] * b[M3_10] + a[M3_12] * b[M3_20];
        output[M3_20] = a[M3_20] * b[M3_00] + a[M3_21] * b[M3_10] + a[M3_22] * b[M3_20];
        output[M3_01] = a[M3_00] * b[M3_01] + a[M3_01] * b[M3_11] + a[M3_02] * b[M3_21];
        output[M3_11] = a[M3_10] * b[M3_01] + a[M3_11] * b[M3_11] + a[M3_12] * b[M3_21];
        output[M3_21] = a[M3_20] * b[M3_01] + a[M3_21] * b[M3_11] + a[M3_22] * b[M3_21];
        output[M3_02] = a[M3_00] * b[M3_02] + a[M3_01] * b[M3_12] + a[M3_02] * b[M3_22];
        output[M3_12] = a[M3_10] * b[M3_02] + a[M3_11] * b[M3_12] + a[M3_12] * b[M3_22];
        output[M3_22] = a[M3_20] * b[M3_02] + a[M3_21] * b[M3_12] + a[M3_22] * b[M3_22];
    },
    identity4: function (output) {
        output[M4_00] = 1;
        output[M4_10] = 0;
        output[M4_20] = 0;
        output[M4_30] = 0;
        output[M4_01] = 0;
        output[M4_11] = 1;
        output[M4_21] = 0;
        output[M4_31] = 0;
        output[M4_02] = 0;
        output[M4_12] = 0;
        output[M4_22] = 1;
        output[M4_32] = 0;
        output[M4_03] = 0;
        output[M4_13] = 0;
        output[M4_23] = 0;
        output[M4_33] = 1;
    }
};
export default {
    cos: cos, sin: sin, clamp: clamp, vector: vector, matrix: matrix,
    M4_00: M4_00, M4_10: M4_10, M4_20: M4_20, M4_30: M4_30,
    M4_01: M4_01, M4_11: M4_11, M4_21: M4_21, M4_31: M4_31,
    M4_02: M4_02, M4_12: M4_12, M4_22: M4_22, M4_32: M4_32,
    M4_03: M4_03, M4_13: M4_13, M4_23: M4_23, M4_33: M4_33,
    M3_00: M3_00, M3_10: M3_10, M3_20: M3_20,
    M3_01: M3_01, M3_11: M3_11, M3_21: M3_21,
    M3_02: M3_02, M3_12: M3_12, M3_22: M3_22
};
//# sourceMappingURL=calc.js.map