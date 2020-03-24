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
        float w = uniImageAspectRatio / uniSceneAspectRatio;
        float x = uniScale * attXY.x * w;
        float y = attXY.y;
        varUV.x = 1.0 / x + 2.0 * (uniAlignX - 0.5) * (w - 1.0) / w;
        varUV.y = -y / uniScale;
        varUV = 0.5 * (vec2(1.0, 1.0) + varUV);
    } else {
        // Image is narrower.
        float h = uniSceneAspectRatio / uniImageAspectRatio;
        float x = attXY.x;
        float y = uniScale * attXY.y * h;
        varUV.x = x / uniScale;
        varUV.y = -1.0 / y - 2.0 * (uniAlignY - 0.5) * (h - 1.0) / h;
        varUV = 0.5 * (vec2(1.0, 1.0) + varUV);
    }
    gl_Position = vec4(attXY, 1.0, 1.0);
}
