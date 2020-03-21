uniform float uniSceneAspectRatio;
uniform float uniImageAspectRatio;
uniform float uniAlignX;
uniform float uniAlignY;
uniform float uniScale;

attribute vec2 attXY;
varying vec2 varUV;

void main() {



    
  varUV = attXY;
  vec2 location = 2.0 * (attXY - vec2(0.5, 0.5));
  if (uniAspectRatio > 1.0) {
    location.y = uniAspectRatio;
  } else {
    location.x = -uniAspectRatio;
  }

  gl_Position = vec4(location.x, -location.y, 1.0, 1.0);
}
