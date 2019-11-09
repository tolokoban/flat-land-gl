var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * @class Color
 * Fast color manipulations.
 * Attributes R  (red), G  (green), B  (blue), A  (alpha), H  (hue), S
 * (saturation), and L (luminance) are all floats between 0 and 1.
 */
var Color = /** @class */ (function () {
    function Color(codeCSS) {
        if (codeCSS === void 0) { codeCSS = "#000000"; }
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.H = 0;
        this.S = 0;
        this.L = 0;
        this.A = 1;
        this.parse(codeCSS);
    }
    Color.prototype.toArrayRGB = function () {
        return [this.R, this.G, this.B];
    };
    Color.prototype.toArrayRGBA = function () {
        return [this.R, this.G, this.B, this.A];
    };
    Color.isValid = function (codeCSS) {
        if (typeof codeCSS !== 'string')
            return false;
        if (codeCSS.charAt(0) !== '#')
            return false;
        switch (codeCSS.length) {
            case 4: // #RGB
            case 5: // #RGBA
            case 7: // #RRGGBB
            case 9: // #RRGGBBAA
                return true;
        }
        return false;
    };
    Color.normalize = function (codeCSS) {
        var color = new Color(codeCSS);
        return color.stringify();
    };
    Color.luminance = function (codeCSS) {
        var color = new Color(codeCSS);
        return color.luminance();
    };
    /**
     * Returns 1 for bright colors and 0 for dark colors.
     */
    Color.luminanceStep = function (codeCSS) {
        var color = new Color(codeCSS);
        return color.luminanceStep();
    };
    Color.fromArrayRGB = function (rgb) {
        var _a = __read(rgb, 3), R = _a[0], G = _a[1], B = _a[2];
        return this.newRGB(R, G, B);
    };
    Color.fromArrayRGBA = function (rgba) {
        var _a = __read(rgba, 4), R = _a[0], G = _a[1], B = _a[2], A = _a[3];
        return this.newRGBA(R, G, B, A);
    };
    /**
     * Mix two colors. alpha should be between 0 and 1,
     * but there is no check on this.
     * If alpha is 0, the resulting color is `color1`,
     * if alpha is 1, the resulting color is `color2`.
     */
    Color.mix = function (color1, color2, alpha) {
        if (alpha === void 0) { alpha = .5; }
        var beta = 1 - alpha;
        return Color.newRGBA(alpha * color2.R + beta * color1.R, alpha * color2.G + beta * color1.G, alpha * color2.B + beta * color1.B, alpha * color2.A + beta * color1.A);
    };
    /**
     * If `colors` has only two elements, this method is the same as `mix()`.
     * Otherwise, it will perform a linear blending through the colors.
     * If alpha is 0, the resulting color is `colors[0]`,
     * If alpha is 1, the resulting color is `colors[colors.length - 1]`,
     */
    Color.ramp = function (colors, alpha) {
        if (alpha === void 0) { alpha = .5; }
        if (colors.length === 0)
            return Color.newBlack();
        if (colors.length === 1)
            return colors[0];
        var spacesCount = colors.length - 1;
        var firstColorIndex = Math.floor(alpha * spacesCount);
        var color1 = colors[firstColorIndex];
        if (firstColorIndex === spacesCount)
            return color1;
        var color2 = colors[firstColorIndex + 1];
        var translatedAlpha = firstColorIndex + alpha / spacesCount;
        return Color.mix(color1, color2, translatedAlpha);
    };
    Color.newBlack = function () {
        return Color.newRGB(0, 0, 0);
    };
    Color.newWhite = function () {
        return Color.newRGB(1, 1, 1);
    };
    /**
     * Create a new Color instance base on R,G,B channels.
     *
     * @param   {number} red - Value between 0 and 1.
     * @param   {number} green - Value between 0 and 1.
     * @param   {number} blue - Value between 0 and 1.
     * @returns {Color} New instance of Color.
     */
    Color.newRGB = function (red, green, blue) {
        var color = new Color();
        color.R = red;
        color.G = green;
        color.B = blue;
        color.A = 1;
        return color;
    };
    /**
     * Create a new Color instance base on R,G,B,A channels.
     *
     * @param   {number} red - Value between 0 and 1.
     * @param   {number} green - Value between 0 and 1.
     * @param   {number} blue - Value between 0 and 1.
     * @param   {number} alpha - Value between 0 and 1.
     * @returns {Color} New instance of Color.
     */
    Color.newRGBA = function (red, green, blue, alpha) {
        var color = new Color();
        color.R = red;
        color.G = green;
        color.B = blue;
        color.A = alpha;
        return color;
    };
    /**
     * Parse a color writtent in CSS syntax.
     *
     * @param   {string} code - CSS color.
     * @returns {boolean} `true` if the color has valid syntax.
     */
    Color.prototype.parse = function (code) {
        if (code === void 0) { code = "#000000"; }
        var input = code.trim().toUpperCase();
        if (this.parseHexa.call(this, input))
            return true;
        if (this.parseRGB.call(this, input))
            return true;
        if (this.parseRGBA.call(this, input))
            return true;
        if (this.parseHSL.call(this, input))
            return true;
        // @TODO parseHSLA.
        return false;
    };
    /**
     * @see https://en.wikipedia.org/wiki/Grayscale
     * @this Color
     * @returns {undefined}
     */
    Color.prototype.luminance = function () {
        return (0.2126 * this.R) + (0.7152 * this.G) + (0.0722 * this.B);
    };
    /**
     * @returns {integer} 0 if the color is dark and 1 if it is light.
     */
    Color.prototype.luminanceStep = function () {
        return this.luminance() < .6 ? 0 : 1;
    };
    /**
     * @this Color
     * @returns {string} String value of the color. `#fd45a7`.
     */
    Color.prototype.stringify = function () {
        var color = hexa2(this.R * 255) + hexa2(this.G * 255) + hexa2(this.B * 255);
        if (this.A < 1) {
            color += hexa2(this.A * 255);
        }
        return "#" + color;
    };
    Color.prototype.copy = function () {
        var newColor = new Color();
        newColor.R = this.R;
        newColor.G = this.G;
        newColor.B = this.B;
        newColor.A = this.A;
        newColor.H = this.H;
        newColor.S = this.S;
        newColor.L = this.L;
        return newColor;
    };
    /**
         * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
         * @this Color
         * @returns {undefined}
         */
    Color.prototype.hsl2rgb = function () {
        var H = 6 * this.H, S = this.S, L = this.L, chroma = (1 - Math.abs(2 * L - 1)) * S, x = chroma * (1 - Math.abs(H % 2 - 1));
        var R = 0, G = 0, B = 0;
        if (H < 3) {
            if (H < 1) {
                R = chroma;
                G = x;
                B = 0;
            }
            else if (H < 2) {
                R = x;
                G = chroma;
                B = 0;
            }
            else {
                // H == 2.
                R = 0;
                G = chroma;
                B = x;
            }
        }
        else if (H < 4) {
            R = 0;
            G = x;
            B = chroma;
        }
        else if (H < 5) {
            R = x;
            G = 0;
            B = chroma;
        }
        else {
            R = chroma;
            G = 0;
            B = x;
        }
        var shift = L - chroma * 0.5;
        this.R = R + shift;
        this.G = G + shift;
        this.B = B + shift;
    };
    Color.prototype.rgb2hsl = function () {
        var R = this.R;
        var G = this.G;
        var B = this.B;
        var min = Math.min(R, G, B);
        var max = Math.max(R, G, B);
        var delta = max - min;
        this.L = 0.5 * (max + min);
        if (delta < 0.000001) {
            this.H = 0;
            this.S = 0;
        }
        else {
            this.S = delta / (1 - Math.abs(2 * this.L - 1));
            if (max === R) {
                if (G >= B) {
                    this.H = INV6 * ((G - B) / delta);
                }
                else {
                    this.H = 1 - INV6 * ((B - G) / delta);
                }
            }
            else if (max === G) {
                this.H = INV6 * (2 + (B - R) / delta);
            }
            else {
                this.H = INV6 * (4 + (R - G) / delta);
            }
        }
    };
    Color.prototype.parseHexa = function (text) {
        if (text.charAt(0) !== '#')
            return false;
        var R = 0, G = 0, B = 0, A = 1;
        switch (text.length) {
            case 4:
                R = parseInt(text.charAt(1), 16) * INV15;
                G = parseInt(text.charAt(2), 16) * INV15;
                B = parseInt(text.charAt(3), 16) * INV15;
                break;
            case 5:
                R = parseInt(text.charAt(1), 16) * INV15;
                G = parseInt(text.charAt(2), 16) * INV15;
                B = parseInt(text.charAt(3), 16) * INV15;
                A = parseInt(text.charAt(4), 16) * INV15;
                break;
            case 7:
                R = parseInt(text.substr(1, 2), 16) * INV255;
                G = parseInt(text.substr(3, 2), 16) * INV255;
                B = parseInt(text.substr(5, 2), 16) * INV255;
                break;
            case 9:
                R = parseInt(text.substr(1, 2), 16) * INV255;
                G = parseInt(text.substr(3, 2), 16) * INV255;
                B = parseInt(text.substr(5, 2), 16) * INV255;
                A = parseInt(text.substr(7, 2), 16) * INV255;
                break;
            default:
        }
        if (isNaN(R) || isNaN(G) || isNaN(B) || isNaN(A)) {
            this.R = this.G = this.B = this.A = 0;
        }
        else {
            this.R = R;
            this.G = G;
            this.B = B;
            this.A = A;
        }
        return true;
    };
    /**
     * @param   {string} text - `rgb(200, 140, 50)`
     * @returns {boolean} `true` if `text` is a valid `rgb()` syntax.
     */
    Color.prototype.parseRGB = function (text) {
        var m = RX_RGB.exec(text);
        if (!m)
            return false;
        this.R = clamp01(parseInt(m[1], 10) * INV255);
        this.G = clamp01(parseInt(m[2], 10) * INV255);
        this.B = clamp01(parseInt(m[3], 10) * INV255);
        this.A = 1;
        return true;
    };
    /**
     * @param   {string} text - `rgba(200, 140, 50, 0.5)`
     * @returns {boolean} `true` if `text` is a valid `rgba()` syntax.
     */
    Color.prototype.parseRGBA = function (text) {
        var m = RX_RGBA.exec(text);
        if (!m)
            return false;
        this.R = clamp01(parseInt(m[1], 10) * INV255);
        this.G = clamp01(parseInt(m[2], 10) * INV255);
        this.B = clamp01(parseInt(m[3], 10) * INV255);
        this.A = clamp01(parseFloat(m[4]));
        return true;
    };
    /**
     * @param   {string} text - `hsl(200, 140, 50)`
     * @returns {boolean} `true` if `text` is a valid `hsl()` syntax.
     */
    Color.prototype.parseHSL = function (text) {
        var m = RX_HSL.exec(text);
        if (!m)
            return false;
        this.H = clamp01(parseInt(m[1], 10) * INV359);
        this.S = clamp01(parseInt(m[2], 10) * INV99);
        this.L = clamp01(parseInt(m[3], 10) * INV99);
        this.A = 1;
        this.hsl2rgb();
        return true;
    };
    return Color;
}());
export default Color;
var INV6 = 1 / 6, INV15 = 1 / 15, INV99 = 1 / 99, INV255 = 1 / 255, INV359 = 1 / 359;
var RX_RGB = /^RGB[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/;
var RX_RGBA = /^RGBA[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9.]+([0-9.]+)/;
var RX_HSL = /^HSL[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/;
function clamp01(value) {
    if (value < 0)
        return 0;
    if (value > 1)
        return 1;
    return value;
}
function hexa2(value) {
    var out = Math.floor(value).toString(16);
    if (out.length < 2)
        out = "0" + out;
    return out;
}
//# sourceMappingURL=color.js.map