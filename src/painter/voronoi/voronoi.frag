precision mediump float;

#include "count"

const vec3 WHITE = vec3(1,1,1);
const vec3 BLACK = vec3(0,0,0);

uniform float uniSeeds[COUNT];
uniform float uniColors[COUNT];
uniform float uniLight;
uniform float uniThickness;

/**
 * The coords of a and b must be in the range [0;1].
 */
float distSquared(vec2 a, vec2 b) {
  float x = abs(a.x - b.x);
  if (x > .5) x = 1.0 - x;
  float y = abs(a.y - b.y);
  if (y > .5) y = 1.0 - y;

  return x*x + y*y;
}

varying vec2 varUV;

void main() {
  vec2 M = vec2(fract(varUV.x), fract(varUV.y));

  float distA = distSquared(M, vec2(uniSeeds[0], uniSeeds[1])) * uniSeeds[2];
  vec3 seedA = vec3(uniSeeds[0], uniSeeds[1], uniSeeds[2]);
  vec3 colorA = vec3(uniColors[0], uniColors[1], uniColors[2]);
  float distB = distSquared(M, vec2(uniSeeds[3], uniSeeds[4])) * uniSeeds[5];
  vec3 seedB = vec3(uniSeeds[3], uniSeeds[4], uniSeeds[5]);
  vec3 colorB = vec3(uniColors[3], uniColors[4], uniColors[5]);

  if (distB < distA) {
    float swaperDist = distA;
    distA = distB;
    distB = swaperDist;
    vec3 swaperSeed = seedA;
    seedA = seedB;
    seedB = swaperSeed;
    vec3 swaperColor = colorA;
    colorA = colorB;
    colorB = swaperColor;
  }

  float dist;
  vec3 seed;
  vec3 color;

  for (int i = 6; i < COUNT; i+=3) {
    seed = vec3(uniSeeds[i], uniSeeds[i+1], uniSeeds[i+2]);
    color = vec3(uniColors[i], uniColors[i+1], uniColors[i+2]);
    dist = distSquared(M, seed.xy) * seed.z;
    if (dist < distA) {
      distB = distA;
      seedB = seedA;
      colorB = colorA;
      distA = dist;
      seedA = seed;
      colorA = color;
    }
    else if (dist < distB) {
      distB = dist;
      seedB = seed;
      colorB = color;
    }
  }

/*
  vec2 AM = M.xy - seedA.xy;
  vec2 AB = seedB.xy - seedA.xy;
  vec2 AB1 = normalize(AB);
  float semiLengthAB = length(AB) * 0.5;
  float distanceFromBorder = semiLengthAB - dot(AM, AB1);
*/

  float dA = distA;
  float dB = distB;
  float distanceFromBorder = dB - dA;
  float alpha;
  vec3 color0;
  vec3 color1;

  if (distanceFromBorder < uniThickness) {
      // Border.
      color0 = BLACK;
      color1 = colorA;
      alpha = smoothstep(0.0, uniThickness, distanceFromBorder);
  } else {
      // Cell.
      color0 = colorA;
      color1 = mix(colorA, WHITE, uniLight);
      alpha = (distanceFromBorder - uniThickness) / (dB - uniThickness);
  }

  gl_FragColor = vec4(mix(color0, color1, alpha), 1);
}
