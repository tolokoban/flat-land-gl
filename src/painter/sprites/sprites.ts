import Atlas from '../../atlas'
import Painter from '../painter'
import Program from '../../webgl/program'
import Scene from '../../scene'
import Sprite, { ISprite } from './sprite'
import { IUniforms } from '../../types'
import frag from './sprites.frag'
import vert from './sprites.vert'

// Allocations will be done by pieces of BLOCK Sprites.
const BLOCK = 64
const NB_ATTRIBS = 6 // attXYZ and attUV and attAngle.
const NB_CORNERS = 4
const CHUNK = NB_ATTRIBS * NB_CORNERS

interface ISpritesPainterParams {
  // Atlas which contains all the sprite images.
  atlas: Atlas
}

export default class SpritesPainter extends Painter {
  private buffElem?: WebGLBuffer
  private buffVert?: WebGLBuffer
  private capacity = BLOCK
  private count = 0
  private dataVert = new Float32Array(BLOCK * CHUNK)
  private readonly params: ISpritesPainterParams
  private prg?: Program

  constructor(params: ISpritesPainterParams) {
    super()
    this.params = params
  }

  private get atlas(): Atlas {
    return this.params.atlas
  }

  createSprite(params: Partial<ISprite>): Sprite {
    if (!this.atlas) {
      throw Error('Unable to create a Sprite because no Atlas has been provided!')
    }
    const { width, height } = this.atlas
    const sprite = new Sprite(this.getData, this.allocateSprite, {
      width,
      height,
      ...params,
    })
    return sprite
  }

  /**
   * Remove a sprite from the list of sprites to render.
   */
  removeSprite(sprite: Sprite) {
    if (sprite.$index < 0) {
      return
    }
    const { sprites } = this
    if (sprites.length === 0) {
      sprite.$index = -1
      return
    }
    if (sprites.length === 1) {
      sprite.$index = -1
      sprites.splice(0, sprites.length)
      this.count = 0
      return
    }
    const lastSprite = sprites.pop()
    if (!lastSprite) {
      return
    }
    lastSprite.$index = sprite.$index
    lastSprite.update({})
    this.count -= 1
    sprite.$index = -1
  }

  render() {
    const { scene, prg, atlas, buffVert, buffElem } = this
    if (!scene || !prg || !atlas || !buffVert || !buffElem) {
      return
    }
    const gl = scene.gl

    // Update sprites' attributes.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffVert)
    gl.bufferData(gl.ARRAY_BUFFER, this.dataVert, gl.DYNAMIC_DRAW)

    gl.enable(gl.DEPTH_TEST)
    prg.use()
    atlas.activate()
    const uniforms = (prg as unknown) as IUniforms
    uniforms.$uniTexture = 0
    uniforms.$uniWidth = scene.width
    uniforms.$uniHeight = scene.height
    prg.bindAttribs(buffVert, 'attXYZ', 'attUV')
    gl.bindBuffer(gl.ARRAY_BUFFER, buffVert)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem)
    gl.drawElements(gl.TRIANGLES, NB_ATTRIBS * this.count, gl.UNSIGNED_SHORT, 0)
  }

  protected destroy(scene: Scene) {
    const { gl } = scene
    const { buffElem, buffVert } = this
    if (!buffElem || !buffVert) {
      return
    }
    gl.deleteBuffer(buffElem)
    gl.deleteBuffer(buffVert)
  }

  protected initialize(scene: Scene) {
    this.prg = this.createProgram({ vert, frag })
    const { gl } = scene

    const buffVert = gl.createBuffer()
    if (!buffVert) {
      throw this.fatal('Not enough memory to create an array buffer!')
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffVert)
    gl.bufferData(gl.ARRAY_BUFFER, this.dataVert, gl.DYNAMIC_DRAW)
    this.buffVert = buffVert

    const buffElem = gl.createBuffer()
    if (!buffElem) {
      throw this.fatal('Not enough memory to create an array buffer!')
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(BLOCK), gl.DYNAMIC_DRAW)
    this.buffElem = buffElem
  }

  private allocateNewBlock() {
    this.capacity += BLOCK

    const { scene, buffElem } = this
    if (!scene) {
      throw Error('No scene!')
    }
    if (!buffElem) {
      throw Error('No buffElem!')
    }
    const { gl } = scene

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(this.capacity), gl.DYNAMIC_DRAW)

    const dataVert = new Float32Array(this.capacity * CHUNK)
    dataVert.set(this.dataVert)
    this.dataVert = dataVert
  }

  /**
   * Since the vertex array can be reallocated, we cannot give a reference to the
   * Float32Array to any Sprite. Instead, we will give them this function that will
   * return the current array.
   */
  private getData = () => this.dataVert

  private allocateSprite = (currentIndex: number): number => {
      if (currentIndex >= 0) {
          // Already allocated.
          return currentIndex
      }
      const index = this.count * CHUNK
      this.count += 1
      if (this.count >= this.capacity) {
        // Allocate a new block.
        this.allocateNewBlock()
      }

      return index
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
