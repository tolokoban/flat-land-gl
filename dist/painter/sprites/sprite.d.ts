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
    private index;
    private readonly data;
    private dirty;
    constructor(index: number, params: Partial<ISprite>);
    update(array: Float32Array): void;
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
//# sourceMappingURL=sprite.d.ts.map