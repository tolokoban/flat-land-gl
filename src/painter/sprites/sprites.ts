import Atlas from '../../atlas'
import Painter from '../painter'
import Program from '../../webgl/program'
import Scene from '../../scene'
import VirtualSprite from "./virtual-sprite"
import Quad, { IQuad } from './quad'
import Sprite, { ISprite } from './sprite'
import { IUniforms } from '../../types'
import frag from './sprites.frag'
import vert from './sprites.vert'

// Allocations will be done by pieces of BLOCK Sprites.
const BLOCK = 64
const NB_ATTRIBS = 6 // attXYZ and attUV and attAngle.
const NB_CORNERS = 4
const CHUNK = NB_ATTRIBS * NB_CORNERS
const DEFAULT_WIDTH = 64
const DEFAULT_HEIGHT = 64
const HALF = 0.5

let globalID = 1

interface ISpritesPainterParams {
  // Atlas which contains all the sprite images.
  atlas: Atlas
}

export default class SpritesPainter extends Painter {
  private _capacity = BLOCK
  private _dataVert = new Float32Array(BLOCK * CHUNK)
  private _buffElem?: WebGLBuffer
  private _buffVert?: WebGLBuffer
  private readonly _atlas: Atlas
  private _prg?: Program
  // If a sprite wnats to be updated but the painter is not yet initialized,
  // we put this sprite in this map in order to update it as soon as the initialization
  // will be done.
  private readonly _deferedSpritesUpdate: Map<string, [VirtualSprite, Float32Array]>
  // We need to keep track of all the inserted sprites because when we want to destroy
  // one, we wnat to exchange its position with the one at the end of the list for
  // optimisation purpose.
  private readonly _sprites: VirtualSprite[] = []

  constructor(params: ISpritesPainterParams) {
    super()
    this._atlas = params.atlas
    this._deferedSpritesUpdate = new Map<string, [VirtualSprite, Float32Array]>()
  }

  get atlas(): Atlas {
    return this._atlas
  }

  get count() {
    return this._sprites.length
  }

  /**
   * Register a new sprite that will be immediatly visible.
   */
  createSprite(params: Partial<ISprite>): Sprite {
    const { atlas } = this
    const width = atlas.width || DEFAULT_WIDTH
    const height = atlas.height || DEFAULT_HEIGHT
    const data = new Float32Array(CHUNK)
    const sprite = new Sprite(
      `${globalID++}`,
      data,
      this._update,
      this._destroy, {
        x: 0, y: 0, z: 0,
        width, height,
        originX: width * HALF, originY: width * HALF,
        u0: 0, v0: 0, u1: 1, v1: 1,
        scale: 1, angle: 0,
        ...params
      })
    sprite.update()
    return sprite
  }

  /**
   * Register a new sprite that will be immediatly visible.
   */
  createQuad(params: Partial<IQuad>): Quad {
    const data = new Float32Array(CHUNK)
    const sprite = new Quad(
      `${globalID++}`,
      data,
      this._update,
      this._destroy, {
          xTL: 0, yTL: 0, zTL: 0, uTL: 0, vTL: 0,
          xTR: 1024, yTR: 0, zTR: 0, uTR: 1, vTR: 0,
          xBR: 1024, yBR: 1024, zBR: 0, uBR: 1, vBR: 1,
          xBL: 0, yBL: 1024, zBL: 0, uBL: 0, vBL: 1,
        ...params
      })
    sprite.update()
    return sprite
  }

  private _update = (sprite: VirtualSprite, data: Float32Array) => {
    if (!this.scene) {
      // If this painter has not yet been initialized, then update has to be defered.
      this._deferedSpritesUpdate.set(
        sprite.id,
        [sprite, data]
      )
      return
    }

    if (sprite.$index < 0) {
      this._allocate(sprite)
    }
    this._dataVert.set(data, CHUNK * sprite.$index)
  }

  /**
   * Only called by an instance os Sprite.
   */
  private _allocate(sprite: VirtualSprite) {
    if (this._capacity <= this.count) {
      this._allocateNewBlock()
    }
    sprite.$index = this.count
    this._sprites.push(sprite)
  }

  /**
   * Only called by an instance os Sprite.
   */
  private _destroy = (sprite: VirtualSprite) => {
    const lastSprite = this._sprites.pop()
    if (!lastSprite) {
      console.error("You tried to destroy a Sprite that is not owned by this painter!", sprite)
      return
    }
    const indexOfLastSprite = lastSprite.$index
    if (indexOfLastSprite !== sprite.$index) {
      // Swap positions of destroyed sprite and last sprite in the list.
      lastSprite.$index = sprite.$index
      this._sprites[lastSprite.$index] = lastSprite
      lastSprite.update()
    }
    sprite.$index = -1
  }

  /**
   * When the number of sprites exceeds the current capacity, we must allocate a new BLOCK.
   * This function cannot be called before painter initialization.
   */
  private _allocateNewBlock() {
    this._capacity += BLOCK

    const { scene, _buffElem } = this
    if (!scene) {
      throw Error('No scene!')
    }
    if (!_buffElem) {
      throw Error('No buffElem!')
    }
    const { gl } = scene

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _buffElem)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(this._capacity), gl.DYNAMIC_DRAW)

    const dataVert = new Float32Array(this._capacity * CHUNK)
    dataVert.set(this._dataVert)
    this._dataVert = dataVert
  }

  render() {
    const { scene, _prg, atlas, _buffVert, _buffElem } = this
    if (!scene || !_prg || !atlas || !_buffVert || !_buffElem) {
      return
    }
    const gl = scene.gl

    // Update sprites' attributes.
    gl.bindBuffer(gl.ARRAY_BUFFER, _buffVert)
    gl.bufferData(gl.ARRAY_BUFFER, this._dataVert, gl.DYNAMIC_DRAW)

    gl.enable(gl.DEPTH_TEST)
    _prg.use()
    atlas.activate()
    const uniforms = (_prg as unknown) as IUniforms
    uniforms.$uniTexture = 0
    uniforms.$uniWidth = scene.width
    uniforms.$uniHeight = scene.height
    _prg.bindAttribs(_buffVert, 'attXYZ', 'attUV')
    gl.bindBuffer(gl.ARRAY_BUFFER, _buffVert)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _buffElem)
    gl.drawElements(gl.TRIANGLES, NB_ATTRIBS * this.count, gl.UNSIGNED_SHORT, 0)
  }

  protected initialize(scene: Scene) {
    this._prg = this.createProgram({ vert, frag })
    const { gl } = scene

    const buffVert = gl.createBuffer()
    if (!buffVert) {
      throw this.fatal('Not enough memory to create an array buffer!')
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffVert)
    gl.bufferData(gl.ARRAY_BUFFER, this._dataVert, gl.DYNAMIC_DRAW)
    this._buffVert = buffVert

    const buffElem = gl.createBuffer()
    if (!buffElem) {
      throw this.fatal('Not enough memory to create an array buffer!')
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(BLOCK), gl.DYNAMIC_DRAW)
    this._buffElem = buffElem

    this.manageDeferedSpritesUpdates()
  }

  protected destroy() {
    const { scene, _buffVert, _buffElem } = this
    if (!scene || !_buffVert || !_buffElem) {
      return
    }

    const gl = scene.gl
    gl.deleteBuffer(_buffVert)
    gl.deleteBuffer(_buffElem)
  }

  private manageDeferedSpritesUpdates() {
    if (this._deferedSpritesUpdate.size === 0) {
      // Nothing to do.
      return
    }

    for (const item of this._deferedSpritesUpdate.values()) {
      const [sprite, data] = item
      this._update(sprite, data)
    }
  }
}

const CORNER_B = 1
const CORNER_C = 2
const CORNER_D = 3

/**
 * A--B
 * |  |
 * D--C
 */
function createElements(capacity: number) {
  const dataElem = new Uint16Array(NB_ATTRIBS * capacity)
  let i = 0
  let a = 0
  for (let k = 0; k < capacity; k++) {
    const b = a + CORNER_B
    const c = a + CORNER_C
    const d = a + CORNER_D
    // tslint:disable:no-magic-numbers
    dataElem[i + 0] = a
    dataElem[i + 1] = d
    dataElem[i + 2] = b
    dataElem[i + 3] = b
    dataElem[i + 4] = d
    dataElem[i + 5] = c
    // tslint:enable:no-magic-numbers
    a += NB_CORNERS
    i += NB_ATTRIBS
  }
  return dataElem
}
