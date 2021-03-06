/**
 * Resolution in CSS pixels. If omitted, the real resolution
 * of the device is taken. On smartphones, for instance,
 * the resolution is often greater than 1.
 *
 * Return `true` if the size has changed.
 */
export default (function (gl, _resolution) {
    if (_resolution === void 0) { _resolution = 0; }
    var resolution = _resolution <= 0 ? window.devicePixelRatio : _resolution;
    var canvas = gl.canvas;
    if (canvas instanceof HTMLCanvasElement) {
        var displayWidth = Math.floor(canvas.clientWidth * resolution);
        var displayHeight = Math.floor(canvas.clientHeight * resolution);
        // Check if the canvas is not the same size.
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            // Make the canvas the same size
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            gl.viewport(0, 0, displayWidth, displayHeight);
            return true;
        }
    }
    return false;
});
//# sourceMappingURL=resize.js.map