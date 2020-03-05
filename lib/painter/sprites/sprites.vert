attribute vec3 attXYZ;
attribute vec2 attUV;

varying vec2 varUV;

#include cameraUniforms
#include cameraFunction

void main() {
  varUV = attUV;
  gl_Position = worldPointToScreen(attXYZ);
}
