// tslint:disable:no-bitwise

const FULL_TURN = 4096
const MODULO = FULL_TURN - 1
const HALF_TURN = 2048

const COS = new Float32Array(FULL_TURN)
const SIN = new Float32Array(FULL_TURN)

// Prepare acceleration table for COS and SIN.
for (let i = 0; i < FULL_TURN; i++) {
    const angle = (Math.PI * i) / HALF_TURN
    COS[i] = Math.cos(angle)
    SIN[i] = Math.sin(angle)
}

export default { cos, sin, clamp }

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
