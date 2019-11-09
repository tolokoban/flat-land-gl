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
    private readonly data: ISprite
    private dirty = false

    constructor(private index: number, params: Partial<ISprite>) {
        this.data = {
            x: 0, y: 0, z: 0,
            width: 50, height: 50,
            originX: 0, originY: 0,
            u0: 0, v0: 0, u1: 1, v1: 1
        }
    }

    update(array: Float32Array) {
        
    }

    get x() { return this.data.x }
    set x(v: number) {
        this.data.x = v
        this.dirty = true
    }

    get y() { return this.data.y }
    set y(v: number) {
        this.data.y = v
        this.dirty = true
    }

    get z() { return this.data.z }
    set z(v: number) {
        this.data.z = v
        this.dirty = true
    }

    get width() { return this.data.width }
    set width(v: number) {
        this.data.width = v
        this.dirty = true
    }

    get height() { return this.data.height }
    set height(v: number) {
        this.data.height = v
        this.dirty = true
    }

    get originX() { return this.data.originX }
    set originX(v: number) {
        this.data.originX = v
        this.dirty = true
    }

    get originY() { return this.data.originY }
    set originY(v: number) {
        this.data.originY = v
        this.dirty = true
    }

    get u0() { return this.data.u0 }
    set u0(v: number) {
        this.data.u0 = v
        this.dirty = true
    }

    get v0() { return this.data.v0 }
    set v0(v: number) {
        this.data.v0 = v
        this.dirty = true
    }

    get u1() { return this.data.u1 }
    set u1(v: number) {
        this.data.u1 = v
        this.dirty = true
    }

    get v1() { return this.data.v1 }
    set v1(v: number) {
        this.data.v1 = v
        this.dirty = true
    }
}
