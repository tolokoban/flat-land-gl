const COS = new Float32Array(4096)
const SIN = new Float32Array(4096)

// Prepare acceleration table for COS and SIN.
for (let i = 0 ; i < 4096 ; i++) {
    const angle = Math.PI * i / 2048
    COS[i] = Math.cos(angle)
    SIN[i] = Math.sin(angle)
}

export default { cos, sin }

/**
 * Fast cosine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function cos(angle: number) {
    return COS[(angle|0) & 4095]
}

/**
 * Fast sine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function sin(angle: number) {
    return SIN[(angle|0) & 4095]
}
