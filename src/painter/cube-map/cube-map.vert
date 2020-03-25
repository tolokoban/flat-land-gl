uniform float uniSceneAspectRatio;
uniform mat3 uniRotation;
attribute vec2 attXY;
varying vec3 varDirection;

void main() {
    float x = uniSceneAspectRatio > 1.0 ? attXY.x : attXY.x * uniSceneAspectRatio;
    float y = uniSceneAspectRatio > 1.0 ? attXY.y * uniSceneAspectRatio: attXY.y;
    float z = 1.0;
    varDirection = uniRotation * vec3(x, y, z);
    gl_Position = vec4(x, y, z, 1.0);
}
