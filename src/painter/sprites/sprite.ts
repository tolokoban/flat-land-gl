import Calc from '../../calc'

export interface ISprite {
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    originX: number,
    originY: number,
    u0: number,
    v0: number,
    u1: number,
    v1: number,
    scale: number,
    angle: number
}

export default class Sprite {

    get x() { return this.params.x }
    get y() { return this.params.y }
    get z() { return this.params.z }
    get width() { return this.params.width }
    get height() { return this.params.height }
    get originX() { return this.params.originX }
    get originY() { return this.params.originY }
    get u0() { return this.params.u0 }
    get v0() { return this.params.v0 }
    get u1() { return this.params.u1 }
    get v1() { return this.params.v1 }
    public readonly extra: {[key: string]: any} = {}
    public $index: number = 0
    private params: ISprite

    constructor(index: number, private getData: () => Float32Array, params: Partial<ISprite>) {
        this.$index = index
        const width = params.width || 50
        const height = params.height || 50
        this.params = {
            x: 0, y: 0, z: 0,
            width, height,
            originX: width / 2,
            originY: height / 2,
            u0: 0, v0: 0, u1: 1, v1: 1,
            scale: 1,
            angle: 0,
            ...params,
        }
        this.update(this.params)
    }

    public update(newParams: Partial<ISprite>) {
        this.params = { ...this.params, ...newParams }

        const { getData, $index, params } = this
        const data = getData()
        const { x, y, z, originX, originY, width, height, u0, v0, u1, v1, scale, angle } = params
        const xxA = -originX
        const yyA = -originY
        const xxB = xxA + width
        const yyB = yyA
        const xxC = xxA + width
        const yyC = yyA + height
        const xxD = xxA
        const yyD = yyA + height

        let xA = xxA * scale
        let yA = yyA * scale
        let xB = xxB * scale
        let yB = yyB * scale
        let xC = xxC * scale
        let yC = yyC * scale
        let xD = xxD * scale
        let yD = yyD * scale

        if ((angle|0) !== 0) {
            const C = Calc.cos(angle)
            const S = Calc.sin(angle)

            xA = (xxA * C + yyA * S) * scale
            yA = (yyA * C - xxA * S) * scale
            xB = (xxB * C + yyB * S) * scale
            yB = (yyB * C - xxB * S) * scale
            xC = (xxC * C + yyC * S) * scale
            yC = (yyC * C - xxC * S) * scale
            xD = (xxD * C + yyD * S) * scale
            yD = (yyD * C - xxD * S) * scale
        }

        data[$index + 0] = xA + x
        data[$index + 1] = yA + y
        data[$index + 2] = z
        data[$index + 3] = u0
        data[$index + 4] = v0

        data[$index + 5] = xB + x
        data[$index + 6] = yB + y
        data[$index + 7] = z
        data[$index + 8] = u1
        data[$index + 9] = v0

        data[$index + 10] = xC + x
        data[$index + 11] = yC + y
        data[$index + 12] = z
        data[$index + 13] = u1
        data[$index + 14] = v1

        data[$index + 15] = xD + x
        data[$index + 16] = yD + y
        data[$index + 17] = z
        data[$index + 18] = u0
        data[$index + 19] = v1
    }
}