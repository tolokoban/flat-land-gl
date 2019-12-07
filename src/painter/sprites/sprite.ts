/**
 * Sprites management is complex because we must be able to add sprites
 * even for Painters that are not yet used in a Scene.
 */

import Calc from '../../calc'
import { IExtra } from '../../types'

export interface ISprite {
  x: number
  y: number
  z: number
  width: number
  height: number
  originX: number
  originY: number
  u0: number
  v0: number
  u1: number
  v1: number
  scale: number
  angle: number
}

type IUpdateFunction = (sprite: Sprite, data: Float32Array) => void
type IDestroyFunction = (sprite: Sprite) => void

export default class Sprite {
  get x() {
    return this._params.x
  }
  get y() {
    return this._params.y
  }
  get z() {
    return this._params.z
  }
  get width() {
    return this._params.width
  }
  get height() {
    return this._params.height
  }
  get originX() {
    return this._params.originX
  }
  get originY() {
    return this._params.originY
  }
  get u0() {
    return this._params.u0
  }
  get v0() {
    return this._params.v0
  }
  get u1() {
    return this._params.u1
  }
  get v1() {
    return this._params.v1
  }

  readonly extra: IExtra = {}
  $index = -1
  private readonly _data: Float32Array
  private _params: ISprite
  private readonly _id: string
  private readonly _update: IUpdateFunction
  private readonly _destroy: IDestroyFunction

  constructor(id: string, data: Float32Array,
              update: IUpdateFunction, destroy: IDestroyFunction,
              params: ISprite) {
    this._id = id
    this._data = data
    this._update = update
    this._destroy = destroy
    this._params = params
  }

  get id() { return this._id }

  destroy() {
    this._destroy(this)
  }

  update(newParams?: Partial<ISprite>) {
    if (newParams) {
      this._params = { ...this._params, ...newParams }
    }
    const { x, y, z, originX, originY, width, height, u0, v0, u1, v1, scale, angle } = this._params
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

    // tslint:disable-next-line:no-bitwise
    if ((angle | 0) !== 0) {
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

    const data = this._data
    // tslint:disable:no-magic-numbers
    data[0] = xA + x
    data[1] = yA + y
    data[2] = z
    data[3] = u0
    data[4] = v0

    data[5] = xB + x
    data[6] = yB + y
    data[7] = z
    data[8] = u1
    data[9] = v0

    data[10] = xC + x
    data[11] = yC + y
    data[12] = z
    data[13] = u1
    data[14] = v1

    data[15] = xD + x
    data[16] = yD + y
    data[17] = z
    data[18] = u0
    data[19] = v1
    // tslint:enable:no-magic-numbers

    this._update(this, data)
  }
}
