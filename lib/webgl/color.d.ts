export default class Color {
    /**
     * A code CSS is valid if it starts with a '#' and has a length of 3, 4, 6 or 8.
     */
    static isValid(codeCSS: string): boolean;
    static normalize(codeCSS: string): string;
    static luminance(codeCSS: string): number;
    /**
     * Returns 1 for bright colors and 0 for dark colors.
     */
    static luminanceStep(codeCSS: string): number;
    static fromArrayRGB(rgb: [number, number, number]): Color;
    static fromArrayRGBA(rgba: [number, number, number, number]): Color;
    /**
     * Mix two colors. alpha should be between 0 and 1,
     * but there is no check on this.
     * If alpha is 0, the resulting color is `color1`,
     * if alpha is 1, the resulting color is `color2`.
     */
    static mix(color1: Color, color2: Color, alpha?: number): Color;
    /**
     * If `colors` has only two elements, this method is the same as `mix()`.
     * Otherwise, it will perform a linear blending through the colors.
     * If alpha is 0, the resulting color is `colors[0]`,
     * If alpha is 1, the resulting color is `colors[colors.length - 1]`,
     */
    static ramp(colors: Color[], alpha?: number): Color;
    static newBlack(): Color;
    static newWhite(): Color;
    /**
     * Create a new Color instance base on R,G,B channels.
     *
     * @param red - Value between 0 and 1.
     * @param green - Value between 0 and 1.
     * @param blue - Value between 0 and 1.
     * @returns New instance of Color.
     */
    static newRGB(red: number, green: number, blue: number): Color;
    /**
     * Create a new Color instance base on R,G,B,A channels.
     *
     * @param red - Value between 0 and 1.
     * @param green - Value between 0 and 1.
     * @param blue - Value between 0 and 1.
     * @param alpha - Value between 0 and 1.
     * @returns New instance of Color.
     */
    static newRGBA(red: number, green: number, blue: number, alpha: number): Color;
    R: number;
    G: number;
    B: number;
    H: number;
    S: number;
    L: number;
    A: number;
    constructor(codeCSS?: string);
    toArrayRGB(): [number, number, number];
    toArrayRGBA(): [number, number, number, number];
    /**
     * Parse a color writtent in CSS syntax.
     *
     * @param code - CSS color.
     * @returns `true` if the color has valid syntax.
     */
    parse(code?: string): boolean;
    /**
     * @see https://en.wikipedia.org/wiki/Grayscale
     * @this Color
     * @returns {undefined}
     */
    luminance(): number;
    /**
     * @returns {integer} 0 if the color is dark and 1 if it is light.
     */
    luminanceStep(): number;
    /**
     * @this Color
     * @returns String value of the color. `#fd45a7`.
     */
    stringify(): string;
    copy(): Color;
    /**
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
     */
    hsl2rgb(): void;
    rgb2hsl(): void;
    private parseHexa;
    /**
     * @param text - `rgb(200, 140, 50)`
     * @returns `true` if `text` is a valid `rgb()` syntax.
     */
    private parseRGB;
    /**
     * @param text - `rgba(200, 140, 50, 0.5)`
     * @returns `true` if `text` is a valid `rgba()` syntax.
     */
    private parseRGBA;
    /**
     * @param text - `hsl(200, 140, 50)`
     * @returns `true` if `text` is a valid `hsl()` syntax.
     */
    private parseHSL;
}
