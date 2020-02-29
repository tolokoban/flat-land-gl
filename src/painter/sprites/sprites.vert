uniform float uniWidth;
uniform float uniHeight;
attribute vec3 attXYZ;
attribute vec2 attUV;
varying vec2 varUV;

const float RESOLUTION = 512.0;
const float INV_RESOLUTION = 1.0 / RESOLUTION;

#include cameraUniforms
#include cameraFunction

void main() {
  varUV = attUV;
  float widestSide = max(uniWidth, uniHeight);
  float w = widestSide / uniWidth;
  float h = widestSide / uniHeight;
  float x = w * (attXYZ.x - RESOLUTION) * INV_RESOLUTION;
  float y = h * (attXYZ.y - RESOLUTION) * INV_RESOLUTION;

  gl_Position = worldPointToScreen(vec3(x, -y, attXYZ.z));
}
