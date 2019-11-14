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
    scale: number;
}
export default class Sprite {
    private getData;
    get x(): number;
    get y(): number;
    get z(): number;
    get width(): number;
    get height(): number;
    get originX(): number;
    get originY(): number;
    get u0(): number;
    get v0(): number;
    get u1(): number;
    get v1(): number;
    readonly extra: {
        [key: string]: any;
    };
    $index: number;
    private params;
    constructor(index: number, getData: () => Float32Array, params: Partial<ISprite>);
    update(newParams: Partial<ISprite>): void;
}
//# sourceMappingURL=sprite.d.ts.map