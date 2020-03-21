uniform float uniSceneAspectRatio;
uniform float uniImageAspectRatio;
uniform float uniAlignX;
uniform float uniAlignY;
uniform float uniScale;

attribute vec2 attXY;
varying vec2 varUV;

void main() {
    if (uniImageAspectRatio > uniSceneAspectRatio) {
        // Image is wider.
        float w = 2.0 * uniImageAspectRatio / uniSceneAspectRatio;
        float h = 2.0;
        float shiftX = w - 2.0;
        float x = uniScale * (attXY.x - uniAlignX * shiftX);
        float y = uniScale * attXY.y;
        varUV = vec2((x + 1.0) / w, 1.0 - (y + 1.0) / h);
    } else {
        // Image is narrower.
        float w = 2.0;
        float h = 2.0 * uniSceneAspectRatio / uniImageAspectRatio;
        float shiftY = h - 2.0;
        float x = uniScale * attXY.x;
        float y = uniScale * (attXY.y - uniAlignY * shiftY);
        varUV = vec2((x + 1.0) / w, 1.0 - (y + 1.0) / h);
    }
    gl_Position = vec4(attXY, 0.0, 1.0);
}
