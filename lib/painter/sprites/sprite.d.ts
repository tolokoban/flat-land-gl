/**
 * Sprites management is complex because we must be able to add sprites
 * even for Painters that are not yet used in a Scene.
 */
import { IExtra } from '../../types';
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
declare type IUpdateFunction = (sprite: Sprite, data: Float32Array) => void;
declare type IDestroyFunction = (sprite: Sprite) => void;
export default class Sprite {
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
    readonly extra: IExtra;
    $index: number;
    private readonly _data;
    private _params;
    private readonly _id;
    private readonly _update;
    private readonly _destroy;
    constructor(id: string, data: Float32Array, update: IUpdateFunction, destroy: IDestroyFunction, params: ISprite);
    get id(): string;
    destroy(): void;
    update(newParams?: Partial<ISprite>): void;
}
export {};
