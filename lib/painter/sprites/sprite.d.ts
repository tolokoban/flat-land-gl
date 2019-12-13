/**
 * Sprites management is complex because we must be able to add sprites
 * even for Painters that are not yet used in a Scene.
 */
import VirtualSprite, { IUpdateFunction, IDestroyFunction } from "./virtual-sprite";
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
    angle: number;
}
export default class Sprite extends VirtualSprite {
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
    private _params;
    constructor(id: string, data: Float32Array, update: IUpdateFunction, destroy: IDestroyFunction, params: ISprite);
    update(newParams?: Partial<ISprite>): void;
}
