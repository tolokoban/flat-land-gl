uniform float uniWidth;
uniform float uniHeight;

attribute vec3 attXYZ;
attribute vec2 attUV;

varying vec2 varUV;

const float RESOLUTION = 512.0;
const float INV_RESOLUTION = 1.0 / RESOLUTION;

//#include cameraUniforms
//#include cameraFunction

void main() {
  varUV = attUV;
  float widestSide = max(1024.0, max(uniWidth, uniHeight));
  float w = widestSide / max(1024.0, uniWidth);
  float h = widestSide / max(1024.0, uniHeight);
  float x = w * attXYZ.x * INV_RESOLUTION;
  float y = h * attXYZ.y * INV_RESOLUTION;

  gl_Position = vec4(x, -y, attXYZ.z, 1.0);
  //gl_Position = worldPointToScreen(vec3(x, -y, attXYZ.z));
}
