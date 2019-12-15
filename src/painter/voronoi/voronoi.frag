precision mediump float;

const float BLACK_THRESHOLD = 0.03;
const int COUNT = 60;
uniform float uniSeeds[COUNT];

float distSquared(vec2 a, vec2 b) {
  float x = abs(fract(a.x) - b.x);
  if (x > .5) x = 1.0 - x;
  float y = abs(fract(a.y) - b.y);
  if (y > .5) y = 1.0 - y;

  return x*x + y*y;
}

varying vec2 varUV;

void main() {
  float distA = distSquared(varUV, vec2(uniSeeds[0], uniSeeds[1])) * uniSeeds[2];
  vec3 seedA = vec3(uniSeeds[0], uniSeeds[1], uniSeeds[2]);
  float distB = distSquared(varUV, vec2(uniSeeds[3], uniSeeds[4])) * uniSeeds[5];
  vec3 seedB = vec3(uniSeeds[3], uniSeeds[4], uniSeeds[5]);

  if (distB < distA) {
    float swaperDist = distA;
    distA = distB;
    distB = swaperDist;
    vec3 swaperSeed = seedA;
    seedA = seedB;
    seedB = swaperSeed;
  }

  float dist;
  vec3 seed;

  for (int i = 6; i < COUNT; i+=3) {
    seed = vec3(uniSeeds[i], uniSeeds[i+1], uniSeeds[i+2]);
    dist = distSquared(varUV, seed.xy) * seed.z;
    if (dist < distA) {
      distB = distA;
      seedB = seedA;
      distA = dist;
      seedA = seed;
    }
    else if (dist < distB) {
      distB = dist;
      seedB = seed;
    }
  }

  float dA = sqrt(distA);
  float dB = sqrt(distB);
  float a = 2.0 * dA / (dA + dB);

  vec3 color0 = vec3(1, 1, 1);
  vec3 color1 = vec3(seedA[0], seedA[1], seedA[2]);
  vec3 color = mix(color0, color1, a);
  float b = clamp((1.0 - a) / BLACK_THRESHOLD, 0.0, 1.0);
  color = (0.5 + b * 0.5) * color;
  gl_FragColor = vec4(color, 1);
}
