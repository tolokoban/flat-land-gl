export interface ISprite {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    originX: number;
    originY: number;
    u0: number;
    v0: number;
    u1: number;
    v1: number;
}
export default class Sprite {
    private params;
    private readonly index;
    private readonly data;
    constructor(index: number, data: Float32Array, params: Partial<ISprite>);
    update(newParams: Partial<ISprite>): void;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly width: number;
    readonly height: number;
    readonly originX: number;
    readonly originY: number;
    readonly u0: number;
    readonly v0: number;
    readonly u1: number;
    readonly v1: number;
}
//# sourceMappingURL=sprite.d.ts.map