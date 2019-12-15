precision mediump float;
const vec3[5] uniSeeds = vec3[](
  vec3(0.3472431888021802, 0.631454506580681, 0.6609034006328948)
  vec3(0.7760592575965383, 0.7042518717376975, 0.5679672455987957)
  vec3(0.3565573752709089, 0.06329261043928736, 0.6950113412038291)
  vec3(0.7092772755332116, 0.12068752892848567, 0.9244818024731156)
  vec3(0.5701601897736379, 0.6714228246317681, 0.0011043655929552365)
);
varying vec2 varUV;

function distSquared(vec2 a, vec2 b) {
  float x = a.x - b.x;
  float y = a.y - b.y;

  return x*x + y*y;
}

void main() {
  float swaper;
  
  float distA = distSquared(varUV, uniSeeds[0].xy);
  float seedA = uniSeeds[0];
  float distB = distSquared(varUV, uniSeeds[1].xy);
  float seedB = uniSeeds[1];

  if (distB < distA) {
    swaper = distA;
    distA = distB;
    distB = swaper;
    swaper = seedA;
    seedA = seedB;
    seedB = swaper;
  }
  
  gl_FragColor = color;
}
