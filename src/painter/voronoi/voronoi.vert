uniform float uniScaleX;
uniform float uniScaleY;

attribute vec2 attXY;
varying vec2 varUV;

void main() {
  varUV = vec2(attXY.x * uniScaleX, attXY.y * uniScaleY);
  float x = (attXY.x * 2.0) - 1.0;
  float y = 1.0 - (attXY.y * 2.0);
  gl_Position = vec4(x, y, 0.0, 1.0);
}
