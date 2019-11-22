/**
 *
 */
import Atlas from "../../atlas"
import Scene from "../../scene"
import Program from "../../webgl/program"
import Painter from "../painter"
import Sprite, { ISprite } from "./sprite"
import frag from "./sprites.frag"
import vert from "./sprites.vert"

// Allocations will be done by pieces of BLOCK Sprites.
const BLOCK = 64
const NB_ATTRIBS = 6  // attXYZ and attUV and attAngle.
const NB_CORNERS = 4
const CHUNK = NB_ATTRIBS * NB_CORNERS

interface ISpritesPainterParams {
    scene: Scene,
    atlas: string
}

export default class SpritesPainter extends Painter {
    private atlas: Atlas
    private prg: Program
    private dataVert = new Float32Array(BLOCK * CHUNK)
    private buffVert: WebGLBuffer
    private buffElem: WebGLBuffer
    private sprites: Sprite[] = []
    private count = 0
    private capacity = BLOCK

    constructor(private params: ISpritesPainterParams) {
        super()
        if (params.scene instanceof Scene) {
            this.scene = params.scene
        } else {
            throw Error('Attribute "scene" is mandatory for "Sprites" painter!')
        }
    }

    protected destroy(scene: Scene) {
        const { gl } = scene
        const { buffElem, buffVert } = this
        gl.deleteBuffer(buffElem)
        gl.deleteBuffer(buffVert)
    }

    protected initialize(scene: Scene) {
        const { atlas } = this.params
        const atlasObj = scene.getAtlas(atlas)
        if (!atlasObj) {
            throw this.fatal(`Atlas "${atlas}" not found!`)
        }

        this.atlas = atlasObj
        this.prg = this.createProgram({ vert, frag })
        const { gl } = scene

        const buffVert = gl.createBuffer()
        if (!buffVert) {
            throw this.fatal("Not enough memory to create an array buffer!")
        }
        gl.bindBuffer( gl.ARRAY_BUFFER, buffVert )
        gl.bufferData( gl.ARRAY_BUFFER, this.dataVert, gl.DYNAMIC_DRAW )
        this.buffVert = buffVert

        const buffElem = gl.createBuffer()
        if (!buffElem) {
            throw this.fatal("Not enough memory to create an array buffer!")
        }
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffElem )
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            createElements(BLOCK),
            gl.DYNAMIC_DRAW )
        this.buffElem = buffElem
    }

    public createSprite(params: Partial<ISprite>): Sprite {
        const index = this.count * CHUNK
        this.count++
        if (this.count >= this.capacity) {
            // Allocate a new block.
            this.allocateNewBlock()
        }

        const { width, height } = this.atlas
        const sprite = new Sprite(index, this.getData, {
            width,
            height,
            ...params,
        })
        this.sprites.push(sprite)
        return sprite
    }

    /**
     * Remove a sprite from the list of sprites to render.
     */
    public removeSprite(sprite: Sprite) {
        if (sprite.$index < 0) return
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
        if (!lastSprite) return
        lastSprite.$index = sprite.$index
        lastSprite.update({})
        this.count--
        sprite.$index = -1
    }

    public render() {
        const { scene, prg, atlas, buffVert, buffElem } = this
        if (!scene) return
        const gl = scene.gl

        // Update sprites' attributes.
        gl.bindBuffer( gl.ARRAY_BUFFER, buffVert )
        gl.bufferData( gl.ARRAY_BUFFER, this.dataVert, gl.DYNAMIC_DRAW )

        gl.enable(gl.DEPTH_TEST)
        prg.use()
        atlas.activate()
        const uniforms = prg as {[key: string]: any}
        uniforms.$uniTexture = 0
        uniforms.$uniWidth = scene.width
        uniforms.$uniHeight = scene.height
        prg.bindAttribs(buffVert, "attXYZ", "attUV")
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem)
        gl.drawElements(gl.TRIANGLES, 6 * this.count, gl.UNSIGNED_SHORT, 0)
    }

    private allocateNewBlock() {
        this.capacity += BLOCK

        const { scene } = this
        if (!scene) {
            throw Error("No scene!")
        }
        const { gl } = scene

        const buffElem = this.buffElem
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffElem )
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            createElements(this.capacity),
            gl.DYNAMIC_DRAW )

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
}

/**
 * A--B
 * |  |
 * D--C
 */
function createElements(capacity: number) {
    const dataElem = new Uint16Array(6 * capacity)
    let i = 0
    let a = 0
    for (let k = 0 ; k < capacity ; k++) {
        const b = a + 1
        const c = a + 2
        const d = a + 3
        dataElem[i + 0] = a
        dataElem[i + 1] = d
        dataElem[i + 2] = b
        dataElem[i + 3] = b
        dataElem[i + 4] = d
        dataElem[i + 5] = c
        a += 4
        i += 6
    }
    return dataElem
}
