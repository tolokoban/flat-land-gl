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

import VirtualSprite, { IUpdateFunction, IDestroyFunction } from "./virtual-sprite"

export interface IQuad {
    // Top Left corner.
    xTL: number, yTL: number, zTL: number, uTL: number, vTL: number,
    // Top Right corner.
    xTR: number, yTR: number, zTR: number, uTR: number, vTR: number,
    // Bottom Right corner.
    xBR: number, yBR: number, zBR: number, uBR: number, vBR: number,
    // Bottom Left corner.
    xBL: number, yBL: number, zBL: number, uBL: number, vBL: number
}

export default class Quad extends VirtualSprite {
  private _params: IQuad

  constructor(id: string, data: Float32Array,
              update: IUpdateFunction, destroy: IDestroyFunction,
              params: IQuad) {
    super(id, data, update, destroy)
    this._params = params
  }

  update(newParams?: Partial<IQuad>) {
    if (newParams) {
      this._params = { ...this._params, ...newParams }
    }
    const {
        xTL, yTL, zTL, uTL, vTL,
        xTR, yTR, zTR, uTR, vTR,
        xBR, yBR, zBR, uBR, vBR,
        xBL, yBL, zBL, uBL, vBL
    } = this._params

    const data = this._data
    // tslint:disable:no-magic-numbers
    data[0] = xTL
    data[1] = yTL
    data[2] = zTL
    data[3] = uTL
    data[4] = vTL

    data[5] = xTR
    data[6] = yTR
    data[7] = zTR
    data[8] = uTR
    data[9] = vTR

    data[10] = xBR
    data[11] = yBR
    data[12] = zBR
    data[13] = uBR
    data[14] = vBR

    data[15] = xBL
    data[16] = yBL
    data[17] = zBL
    data[18] = uBL
    data[19] = vBL
    // tslint:enable:no-magic-numbers

    this._update(this, data)
  }
}
