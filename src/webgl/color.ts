// tslint:disable:no-magic-numbers
// tslint:disable:ban

/**
 * Fast color manipulations.
 * Attributes R  (red), G  (green), B  (blue), A  (alpha), H  (hue), S
 * (saturation), and L (luminance) are all floats between 0 and 1.
 */

const CODE_CSS_LENGTHS = ['#RGB'.length, '#RGBA'.length, '#RRGGBB'.length, '#RRGGBBAA'.length]
const RX_HEX_COLOR = /^#[0-9A-F]+$/gi

const LUMINANCE_THRESHOLD = 0.6

export default class Color {
  /**
   * A code CSS is valid if it starts with a '#' and has a length of 3, 4, 6 or 8.
   */
  static isValid(codeCSS: string) {
    RX_HEX_COLOR.lastIndex = -1
    if (!RX_HEX_COLOR.test(codeCSS)) {
      return false
    }

    for (const len of CODE_CSS_LENGTHS) {
      if (codeCSS.length === len) { return true }
    }

    return false
  }

  static normalize(codeCSS: string) {
    const color = new Color(codeCSS)
    return color.stringify()
  }

  static luminance(codeCSS: string) {
    const color = new Color(codeCSS)
    return color.luminance()
  }

  /**
   * Returns 1 for bright colors and 0 for dark colors.
   */
  static luminanceStep(codeCSS: string) {
    const color = new Color(codeCSS)
    return color.luminanceStep()
  }

  static fromArrayRGB(rgb: [number, number, number]): Color {
    const [R, G, B] = rgb
    return Color.newRGB(R, G, B)
  }

  static fromArrayRGBA(rgba: [number, number, number, number]): Color {
    const [R, G, B, A] = rgba
    return Color.newRGBA(R, G, B, A)
  }

  /**
   * Mix two colors. alpha should be between 0 and 1,
   * but there is no check on this.
   * If alpha is 0, the resulting color is `color1`,
   * if alpha is 1, the resulting color is `color2`.
   */
  static mix(color1: Color, color2: Color, alpha = 0.5): Color {
    const beta = 1 - alpha
    return Color.newRGBA(
      alpha * color2.R + beta * color1.R,
      alpha * color2.G + beta * color1.G,
      alpha * color2.B + beta * color1.B,
      alpha * color2.A + beta * color1.A
    )
  }

  /**
   * If `colors` has only two elements, this method is the same as `mix()`.
   * Otherwise, it will perform a linear blending through the colors.
   * If alpha is 0, the resulting color is `colors[0]`,
   * If alpha is 1, the resulting color is `colors[colors.length - 1]`,
   */
  static ramp(colors: Color[], alpha = 0.5): Color {
    if (colors.length === 0) {
      return Color.newBlack()
    }
    if (colors.length === 1) {
      return colors[0]
    }

    const spacesCount = colors.length - 1
    const firstColorIndex = Math.floor(alpha * spacesCount)
    const color1 = colors[firstColorIndex]
    if (firstColorIndex === spacesCount) {
      return color1
    }
    const color2 = colors[firstColorIndex + 1]
    const translatedAlpha = firstColorIndex + alpha / spacesCount
    return Color.mix(color1, color2, translatedAlpha)
  }

  static newBlack() {
    return Color.newRGB(0, 0, 0)
  }

  static newWhite() {
    return Color.newRGB(1, 1, 1)
  }

  /**
   * Create a new Color instance base on R,G,B channels.
   *
   * @param red - Value between 0 and 1.
   * @param green - Value between 0 and 1.
   * @param blue - Value between 0 and 1.
   * @returns New instance of Color.
   */
  static newRGB(red: number, green: number, blue: number) {
    const color = new Color()
    color.R = red
    color.G = green
    color.B = blue
    color.A = 1
    return color
  }

  /**
   * Create a new Color instance base on R,G,B,A channels.
   *
   * @param red - Value between 0 and 1.
   * @param green - Value between 0 and 1.
   * @param blue - Value between 0 and 1.
   * @param alpha - Value between 0 and 1.
   * @returns New instance of Color.
   */
  static newRGBA(red: number, green: number, blue: number, alpha: number) {
    const color = new Color()
    color.R = red
    color.G = green
    color.B = blue
    color.A = alpha
    return color
  }
  R: number
  G: number
  B: number
  H: number
  S: number
  L: number
  A: number

  constructor(codeCSS = '#000000') {
    this.R = 0
    this.G = 0
    this.B = 0
    this.H = 0
    this.S = 0
    this.L = 0
    this.A = 1

    this.parse(codeCSS)
  }

  toArrayRGB(): [number, number, number] {
    return [this.R, this.G, this.B]
  }

  toArrayRGBA(): [number, number, number, number] {
    return [this.R, this.G, this.B, this.A]
  }

  /**
   * Parse a color writtent in CSS syntax.
   *
   * @param code - CSS color.
   * @returns `true` if the color has valid syntax.
   */
  parse(code = '#000000'): boolean {
    const input = code.trim().toUpperCase()
    if (this.parseHexa.call(this, input)) {
      return true
    }
    if (this.parseRGB.call(this, input)) {
      return true
    }
    if (this.parseRGBA.call(this, input)) {
      return true
    }
    if (this.parseHSL.call(this, input)) {
      return true
    }
    // @TODO parseHSLA.
    return false
  }

  /**
   * @see https://en.wikipedia.org/wiki/Grayscale
   * @this Color
   * @returns {undefined}
   */
  luminance(): number {
    const LUM_RED = 0.2126
    const LUM_GREEN = 0.7152
    const LUM_BLUE = 0.0722

    return LUM_RED * this.R + LUM_GREEN * this.G + LUM_BLUE * this.B
  }

  /**
   * @returns {integer} 0 if the color is dark and 1 if it is light.
   */
  luminanceStep(): number {
    return this.luminance() < LUMINANCE_THRESHOLD ? 0 : 1
  }

  /**
   * @this Color
   * @returns String value of the color. `#fd45a7`.
   */
  stringify() {
    const FF = 0xFF
    let color = hexa2(this.R * FF) + hexa2(this.G * FF) + hexa2(this.B * FF)
    if (this.A < 1) {
      color += hexa2(this.A * FF)
    }
    return `#${color}`
  }

  copy() {
    const newColor = new Color()
    newColor.R = this.R
    newColor.G = this.G
    newColor.B = this.B
    newColor.A = this.A
    newColor.H = this.H
    newColor.S = this.S
    newColor.L = this.L
    return newColor
  }

  /**
   * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
   */
  hsl2rgb() {
    const H = 6 * this.H
    const S = this.S
    const L = this.L
    const chroma = (1 - Math.abs(2 * L - 1)) * S
    const x = chroma * (1 - Math.abs((H % 2) - 1))

    let R = 0
    let G = 0
    let B = 0

    if (H < 3) {
      if (H < 1) {
        R = chroma
        G = x
        B = 0
      } else if (H < 2) {
        R = x
        G = chroma
        B = 0
      } else {
        // H == 2.
        R = 0
        G = chroma
        B = x
      }
    } else if (H < 4) {
      R = 0
      G = x
      B = chroma
    } else if (H < 5) {
      R = x
      G = 0
      B = chroma
    } else {
      R = chroma
      G = 0
      B = x
    }

    const shift = L - chroma * 0.5
    this.R = R + shift
    this.G = G + shift
    this.B = B + shift
  }

  rgb2hsl() {
    const R = this.R
    const G = this.G
    const B = this.B

    const min = Math.min(R, G, B)
    const max = Math.max(R, G, B)
    const delta = max - min

    this.L = 0.5 * (max + min)

    if (delta < 0.000001) {
      this.H = 0
      this.S = 0
    } else {
      this.S = delta / (1 - Math.abs(2 * this.L - 1))
      if (max === R) {
        if (G >= B) {
          this.H = INV6 * ((G - B) / delta)
        } else {
          this.H = 1 - INV6 * ((B - G) / delta)
        }
      } else if (max === G) {
        this.H = INV6 * (2 + (B - R) / delta)
      } else {
        this.H = INV6 * (4 + (R - G) / delta)
      }
    }
  }

  private parseHexa(text: string) {
    if (text.charAt(0) !== '#') {
      return false
    }
    let R = 0
    let G = 0
    let B = 0
    let A = 1

    switch (text.length) {
      case 4:
        R = parseInt(text.charAt(1), 16) * INV15
        G = parseInt(text.charAt(2), 16) * INV15
        B = parseInt(text.charAt(3), 16) * INV15
        break
      case 5:
        R = parseInt(text.charAt(1), 16) * INV15
        G = parseInt(text.charAt(2), 16) * INV15
        B = parseInt(text.charAt(3), 16) * INV15
        A = parseInt(text.charAt(4), 16) * INV15
        break
      case 7:
        R = parseInt(text.substr(1, 2), 16) * INV255
        G = parseInt(text.substr(3, 2), 16) * INV255
        B = parseInt(text.substr(5, 2), 16) * INV255
        break
      case 9:
        R = parseInt(text.substr(1, 2), 16) * INV255
        G = parseInt(text.substr(3, 2), 16) * INV255
        B = parseInt(text.substr(5, 2), 16) * INV255
        A = parseInt(text.substr(7, 2), 16) * INV255
        break
      default:
    }

    if (isNaN(R) || isNaN(G) || isNaN(B) || isNaN(A)) {
      this.R = this.G = this.B = this.A = 0
    } else {
      this.R = R
      this.G = G
      this.B = B
      this.A = A
    }

    return true
  }

  /**
   * @param text - `rgb(200, 140, 50)`
   * @returns `true` if `text` is a valid `rgb()` syntax.
   */
  private parseRGB(text: string) {
    const m = RX_RGB.exec(text)
    if (!m) {
      return false
    }
    this.R = clamp01(parseInt(m[1], 10) * INV255)
    this.G = clamp01(parseInt(m[2], 10) * INV255)
    this.B = clamp01(parseInt(m[3], 10) * INV255)
    this.A = 1
    return true
  }

  /**
   * @param text - `rgba(200, 140, 50, 0.5)`
   * @returns `true` if `text` is a valid `rgba()` syntax.
   */
  private parseRGBA(text: string) {
    const m = RX_RGBA.exec(text)
    if (!m) {
      return false
    }
    this.R = clamp01(parseInt(m[1], 10) * INV255)
    this.G = clamp01(parseInt(m[2], 10) * INV255)
    this.B = clamp01(parseInt(m[3], 10) * INV255)
    this.A = clamp01(parseFloat(m[4]))
    return true
  }

  /**
   * @param text - `hsl(200, 140, 50)`
   * @returns `true` if `text` is a valid `hsl()` syntax.
   */
  private parseHSL(text: string) {
    const m = RX_HSL.exec(text)
    if (!m) {
      return false
    }
    this.H = clamp01(parseInt(m[1], 10) * INV359)
    this.S = clamp01(parseInt(m[2], 10) * INV99)
    this.L = clamp01(parseInt(m[3], 10) * INV99)
    this.A = 1
    this.hsl2rgb()
    return true
  }
}

const INV6 = 1 / 6
const INV15 = 1 / 15
const INV99 = 1 / 99
const INV255 = 1 / 255
const INV359 = 1 / 359

const RX_RGB = /^RGB[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/
const RX_RGBA = /^RGBA[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9.]+([0-9.]+)/
const RX_HSL = /^HSL[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/

function clamp01(value: number): number {
  if (value < 0) {
    return 0
  }
  if (value > 1) {
    return 1
  }
  return value
}

function hexa2(value: number) {
  let out = Math.floor(value).toString(16)
  if (out.length < 2) {
    out = `0${out}`
  }
  return out
}
