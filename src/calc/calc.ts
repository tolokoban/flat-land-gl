// tslint:disable:no-bitwise
import { IVec3, IVec4, IMat3, IMat4 } from '../types'

const FULL_TURN = 4096
const MODULO = FULL_TURN - 1
const HALF_TURN = 2048
const HALF = 0.5
const EPSILON = 0.00000001

const COS = new Float32Array(FULL_TURN)
const SIN = new Float32Array(FULL_TURN)

// Prepare acceleration table for COS and SIN.
for (let i = 0; i < FULL_TURN; i++) {
    const angle = (Math.PI * i) / HALF_TURN
    COS[i] = Math.cos(angle)
    SIN[i] = Math.sin(angle)
}

/**
 * Fast cosine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function cos(angle: number) {
    return COS[(angle | 0) & MODULO]
}

/**
 * Fast sine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function sin(angle: number) {
    return SIN[(angle | 0) & MODULO]
}

/**
 * Force a number to stay between two bounds.
 */
function clamp(v: number, min = 0, max = 1) {
    if (v < min) return min
    if (v > max) return max
    return v
}

const M4_00 = 0
const M4_10 = 1
const M4_20 = 2
const M4_30 = 3
const M4_01 = 4
const M4_11 = 5
const M4_21 = 6
const M4_31 = 7
const M4_02 = 8
const M4_12 = 9
const M4_22 = 10
const M4_32 = 11
const M4_03 = 12
const M4_13 = 13
const M4_23 = 14
const M4_33 = 15

const M3_00 = 0
const M3_10 = 1
const M3_20 = 2
const M3_01 = 3
const M3_11 = 4
const M3_21 = 5
const M3_02 = 6
const M3_12 = 7
const M3_22 = 8

const X = 0
const Y = 1
const Z = 2
const W = 3

const vector = {
    areEqual(a: Float32Array, b: Float32Array): boolean {
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
        }
        return true
    },

    cross3(a: IVec3, b: IVec3, output: IVec3) {
        output[X] = a[Y] * b[Z] - a[Z] * b[Y]
        output[Y] = a[Z] * b[X] - a[X] * b[Z]
        output[Z] = a[X] * b[Y] - a[Y] * b[X]
    },

    dot3(a: IVec3, b: IVec3): number {
        const [xa, ya, za] = a
        const [xb, yb, zb] = b
        return xa * xb + ya * yb + za * zb
    },

    /**
     * @return Length of a 3D vector.
     */
    length3(input: IVec3): number {
        return Math.sqrt(vector.dot3(input, input))
    },

    /**
     * Create a 3D vector with length 1.
     */
    normalize3(input: IVec3, output: IVec3) {
        const len = vector.length3(input)
        output[X] = input[X] * len
        output[Y] = input[Y] * len
        output[Z] = input[Z] * len
    },

    /**
     * Create a 3D vector of length 1, pointing in latitude/longitude position.
     * Latitude goes along with Y axis.
     * orbital3(0, 0) === (0,0,-1)
     *
     * Latitude and longitude are expressed in radians.
     */
    orbital3(latitude: number, longitude: number, output: IVec3) {
        const height = Math.sin(latitude)
        const radius = Math.cos(latitude)
        const angle = longitude - Math.PI * HALF
        output[X] = radius * Math.cos(angle)
        output[Y] = radius * Math.sin(angle)
        output[Z] = height
    },

    /**
     * @return Length of a 3D vector.
     */
    length4(input: IVec4): number {
        const [x, y, z, w] = input
        return Math.sqrt(x * x + y * y + z * z + w * w)
    },

    /**
     * Create a 3D vector with length 1.
     */
    normalize4(input: IVec4, output: IVec4) {
        const len = vector.length4(input)
        output[X] = input[X] * len
        output[Y] = input[Y] * len
        output[Z] = input[Z] * len
        output[W] = input[W] * len
    }
}

const matrix = {
    areEqual: vector.areEqual,

    identity3(output: IMat3) {
        output[M3_00] = 1
        output[M3_10] = 0
        output[M3_20] = 0
        output[M3_01] = 0
        output[M3_11] = 1
        output[M3_21] = 0
        output[M3_02] = 0
        output[M3_12] = 0
        output[M3_22] = 1
    },

    /**
     * Extract a 3x3 matrix from the top/left corner of a 4x4 matrix.
     */
    extract3From4(mat4: IMat4, mat3: IMat3) {
        mat3[M3_00] = mat4[M4_00]
        mat3[M3_10] = mat4[M4_10]
        mat3[M3_20] = mat4[M4_20]
        mat3[M3_01] = mat4[M4_01]
        mat3[M3_11] = mat4[M4_11]
        mat3[M3_21] = mat4[M4_21]
        mat3[M3_02] = mat4[M4_02]
        mat3[M3_12] = mat4[M4_12]
        mat3[M3_22] = mat4[M4_22]
    },

    multiply3(a: IMat3, b: IMat3, output: IMat3) {
        output[M3_00] = a[M3_00] * b[M3_00] + a[M3_01] * b[M3_10] + a[M3_02] * b[M3_20]
        output[M3_10] = a[M3_10] * b[M3_00] + a[M3_11] * b[M3_10] + a[M3_12] * b[M3_20]
        output[M3_20] = a[M3_20] * b[M3_00] + a[M3_21] * b[M3_10] + a[M3_22] * b[M3_20]
        output[M3_01] = a[M3_00] * b[M3_01] + a[M3_01] * b[M3_11] + a[M3_02] * b[M3_21]
        output[M3_11] = a[M3_10] * b[M3_01] + a[M3_11] * b[M3_11] + a[M3_12] * b[M3_21]
        output[M3_21] = a[M3_20] * b[M3_01] + a[M3_21] * b[M3_11] + a[M3_22] * b[M3_21]
        output[M3_02] = a[M3_00] * b[M3_02] + a[M3_01] * b[M3_12] + a[M3_02] * b[M3_22]
        output[M3_12] = a[M3_10] * b[M3_02] + a[M3_11] * b[M3_12] + a[M3_12] * b[M3_22]
        output[M3_22] = a[M3_20] * b[M3_02] + a[M3_21] * b[M3_12] + a[M3_22] * b[M3_22]
    },

    identity4(output: IMat4) {
        output[M4_00] = 1
        output[M4_10] = 0
        output[M4_20] = 0
        output[M4_30] = 0
        output[M4_01] = 0
        output[M4_11] = 1
        output[M4_21] = 0
        output[M4_31] = 0
        output[M4_02] = 0
        output[M4_12] = 0
        output[M4_22] = 1
        output[M4_32] = 0
        output[M4_03] = 0
        output[M4_13] = 0
        output[M4_23] = 0
        output[M4_33] = 1
    },

    multiply4(a: IMat4, b: IMat4, output: IMat4) {
        output[M4_00] = a[M4_00] * b[M4_00] + a[M4_01] * b[M4_10] + a[M4_02] * b[M4_20] + a[M4_03] * b[M4_30]
        output[M4_10] = a[M4_10] * b[M4_00] + a[M4_11] * b[M4_10] + a[M4_12] * b[M4_20] + a[M4_13] * b[M4_30]
        output[M4_20] = a[M4_20] * b[M4_00] + a[M4_21] * b[M4_10] + a[M4_22] * b[M4_20] + a[M4_23] * b[M4_30]
        output[M4_30] = a[M4_30] * b[M4_00] + a[M4_31] * b[M4_10] + a[M4_32] * b[M4_20] + a[M4_33] * b[M4_30]
        output[M4_01] = a[M4_00] * b[M4_01] + a[M4_01] * b[M4_11] + a[M4_02] * b[M4_21] + a[M4_03] * b[M4_31]
        output[M4_11] = a[M4_10] * b[M4_01] + a[M4_11] * b[M4_11] + a[M4_12] * b[M4_21] + a[M4_13] * b[M4_31]
        output[M4_21] = a[M4_20] * b[M4_01] + a[M4_21] * b[M4_11] + a[M4_22] * b[M4_21] + a[M4_23] * b[M4_31]
        output[M4_31] = a[M4_30] * b[M4_01] + a[M4_31] * b[M4_11] + a[M4_32] * b[M4_21] + a[M4_33] * b[M4_31]
        output[M4_02] = a[M4_00] * b[M4_02] + a[M4_01] * b[M4_12] + a[M4_02] * b[M4_22] + a[M4_03] * b[M4_32]
        output[M4_12] = a[M4_10] * b[M4_02] + a[M4_11] * b[M4_12] + a[M4_12] * b[M4_22] + a[M4_13] * b[M4_32]
        output[M4_22] = a[M4_20] * b[M4_02] + a[M4_21] * b[M4_12] + a[M4_22] * b[M4_22] + a[M4_23] * b[M4_32]
        output[M4_32] = a[M4_30] * b[M4_02] + a[M4_31] * b[M4_12] + a[M4_32] * b[M4_22] + a[M4_33] * b[M4_32]
        output[M4_03] = a[M4_00] * b[M4_03] + a[M4_01] * b[M4_13] + a[M4_02] * b[M4_23] + a[M4_03] * b[M4_33]
        output[M4_13] = a[M4_10] * b[M4_03] + a[M4_11] * b[M4_13] + a[M4_12] * b[M4_23] + a[M4_13] * b[M4_33]
        output[M4_23] = a[M4_20] * b[M4_03] + a[M4_21] * b[M4_13] + a[M4_22] * b[M4_23] + a[M4_23] * b[M4_33]
        output[M4_33] = a[M4_30] * b[M4_03] + a[M4_31] * b[M4_13] + a[M4_32] * b[M4_23] + a[M4_33] * b[M4_33]
    },

    /**
     * @return false if the matrix is not invertible.
     */
    invert4(a: IMat4, output: IMat4): boolean {
        const [
            a00, a10, a20, a30,
            a01, a11, a21, a31,
            a02, a12, a22, a32,
            a03, a13, a23, a33
        ] = a

        const b00 = a00 * a11 - a01 * a10
        const b01 = a00 * a12 - a02 * a10
        const b02 = a00 * a13 - a03 * a10
        const b03 = a01 * a12 - a02 * a11
        const b04 = a01 * a13 - a03 * a11
        const b05 = a02 * a13 - a03 * a12
        const b06 = a20 * a31 - a21 * a30
        const b07 = a20 * a32 - a22 * a30
        const b08 = a20 * a33 - a23 * a30
        const b09 = a21 * a32 - a22 * a31
        const b10 = a21 * a33 - a23 * a31
        const b11 = a22 * a33 - a23 * a32
        // Calculate the determinant
        const invDet = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

        if (Math.abs(invDet) < EPSILON) return false

        const det = 1.0 / invDet;

        output[M4_00] = (a11 * b11 - a12 * b10 + a13 * b09) * det
        output[M4_01] = (a02 * b10 - a01 * b11 - a03 * b09) * det
        output[M4_02] = (a31 * b05 - a32 * b04 + a33 * b03) * det
        output[M4_03] = (a22 * b04 - a21 * b05 - a23 * b03) * det
        output[M4_10] = (a12 * b08 - a10 * b11 - a13 * b07) * det
        output[M4_11] = (a00 * b11 - a02 * b08 + a03 * b07) * det
        output[M4_12] = (a32 * b02 - a30 * b05 - a33 * b01) * det
        output[M4_13] = (a20 * b05 - a22 * b02 + a23 * b01) * det
        output[M4_20] = (a10 * b10 - a11 * b08 + a13 * b06) * det
        output[M4_21] = (a01 * b08 - a00 * b10 - a03 * b06) * det
        output[M4_22] = (a30 * b04 - a31 * b02 + a33 * b00) * det
        output[M4_23] = (a21 * b02 - a20 * b04 - a23 * b00) * det
        output[M4_30] = (a11 * b07 - a10 * b09 - a12 * b06) * det
        output[M4_31] = (a00 * b09 - a01 * b07 + a02 * b06) * det
        output[M4_32] = (a31 * b01 - a30 * b03 - a32 * b00) * det
        output[M4_33] = (a20 * b03 - a21 * b01 + a22 * b00) * det

        return true
    },

    /**
     * Rotation around X axis of `angle` radians.
     */
    rotation4X(angle: number, output: IMat4) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        output[M4_00] = 1
        output[M4_10] = 0
        output[M4_20] = 0
        output[M4_30] = 0

        output[M4_10] = 0
        output[M4_11] = c
        output[M4_12] = s
        output[M4_13] = 0

        output[M4_20] = 0
        output[M4_21] = -s
        output[M4_22] = c
        output[M4_23] = 0

        output[M4_30] = 0
        output[M4_31] = 0
        output[M4_32] = 0
        output[M4_33] = 1
    }
}

export default {
    cos, sin, clamp, vector, matrix,
    M4_00, M4_10, M4_20, M4_30,
    M4_01, M4_11, M4_21, M4_31,
    M4_02, M4_12, M4_22, M4_32,
    M4_03, M4_13, M4_23, M4_33,
    M3_00, M3_10, M3_20,
    M3_01, M3_11, M3_21,
    M3_02, M3_12, M3_22
}
