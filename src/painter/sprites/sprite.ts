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
    v1: number
}

export default class Sprite {
    private params: ISprite
    private readonly index: number
    private readonly data: Float32Array

    constructor(index: number, data: Float32Array, params: Partial<ISprite>) {
        this.index = index
        this.data = data
        this.params = {
            x: 0, y: 0, z: 0,
            width: 50, height: 50,
            originX: 0, originY: 0,
            u0: 0, v0: 0, u1: 1, v1: 1,
            ...params
        }
    }

    update(newParams: Partial<ISprite>) {
        this.params = { ...this.params, ...newParams }
        const { data, index, params } = this
        data[index] = params.x
        data[index + 1] = params.y
        data[index + 2] = params.z
    }

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
}
