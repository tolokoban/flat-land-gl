/**
 * Quads are actually any kind of quadrilaters.
 * Each corner has 5 attributes:
 * - x, y, z: space coords.
 * - u, v: atlas coords.
 *
 * They are suffixed with:
 * - TL: Top Left corner.
 * - TR: Top Right corner.
 * - BR: Bottom Right corner.
 * - BL: Bottom Left corner.
 */
import VirtualSprite, { IUpdateFunction, IDestroyFunction } from "./virtual-sprite";
export interface IQuad {
    xTL: number;
    yTL: number;
    zTL: number;
    uTL: number;
    vTL: number;
    xTR: number;
    yTR: number;
    zTR: number;
    uTR: number;
    vTR: number;
    xBR: number;
    yBR: number;
    zBR: number;
    uBR: number;
    vBR: number;
    xBL: number;
    yBL: number;
    zBL: number;
    uBL: number;
    vBL: number;
}
export default class Quad extends VirtualSprite {
    private _params;
    constructor(id: string, data: Float32Array, update: IUpdateFunction, destroy: IDestroyFunction, params: IQuad);
    update(newParams?: Partial<IQuad>): void;
}
