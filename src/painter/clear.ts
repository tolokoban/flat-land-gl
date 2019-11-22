/**
 * Clear the screen by filling it with a plain color.
 * This color is defined by attributes red, gree, blue and alpha, which must be between 0 and 1.
 */
import Color from "../webgl/color"
import Painter from "./painter"

interface IClearPainterParams {
    color?: string
}

export default class ClearPainter extends Painter {
    private _red = 0.8
    private _green = 0.4
    private _blue = 0.2
    private _alpha = 1

    constructor(private params: IClearPainterParams) {
        super()
    }

    protected initialize() {
        if (this.params) {
            this.color = this.params.color || "#d72"        
        }
    }
    protected destroy() {}

    get red() { return this._red }
    set red(v: number) { this._red = v }

    get green() { return this._green }
    set green(v: number) { this._green = v }

    get blue() { return this._blue }
    set blue(v: number) { this._blue = v }

    get alpha() { return this._alpha }
    set alpha(v: number) { this._alpha = v }

    get color() {
        const color = new Color()
        color.R = this._red
        color.G = this._green
        color.B = this._blue
        color.A = this._alpha
        return color.stringify()
    }
    set color(cssColor: string) {
        const color = new Color(cssColor)
        this._red = color.R
        this._green = color.G
        this._blue = color.B
        this._alpha = color.A
    }

    public render() {
        const { scene } = this
        if (!scene) return
        const { gl } = scene
        gl.clearColor(this._red, this._green, this._blue, this._alpha)
        gl.clear(gl.COLOR_BUFFER_BIT)
    }
}
