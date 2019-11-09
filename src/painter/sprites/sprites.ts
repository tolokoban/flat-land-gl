/**
 *
 */
import Painter from '../painter'
import Scene from '../../scene'
import Atlas from '../../atlas'
import Program from '../../webgl/program'
import castString from '../../converter/string'
import vert from './sprites.vert'
import frag from './sprites.frag'

// Allocations will be done by pieces of BLOCK Sprites.
const BLOCK = 64
const NB_ATTRIBS = 5  // attXYZ and attUV.
const NB_CORNERS = 4

interface ISpritesPainterParams {
    atlasName: string
}

export default class SpritesPainter extends Painter {
    private readonly atlas: Atlas
    private readonly prg: Program
    private readonly buffVert: WebGLBuffer
    private readonly buffElem: WebGLBuffer
    private count = 0
    private capacity = BLOCK

    constructor(name: string, scene: Scene, params: ISpritesPainterParams) {
        super(name, scene)
        const { atlasName } = params
        const atlas = scene.getAtlas(atlasName)
        if (!atlas) {
            throw this.fatal(`Atlas "${atlasName}" not found!`)
        }

        this.atlas = atlas
        this.prg = this.createProgram({ vert, frag })
        const { gl } = scene

        const buffVert = gl.createBuffer();
        if (!buffVert) {
            throw this.fatal("Not enough memory to create an array buffer!")
        }
        gl.bindBuffer( gl.ARRAY_BUFFER, buffVert )
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(NB_ATTRIBS * NB_CORNERS * BLOCK),
            gl.DYNAMIC_DRAW )
        this.buffVert = buffVert

        const buffElem = gl.createBuffer();
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

    render() {
        const { scene, prg, atlas, buffVert, buffElem } = this
        const gl = scene.gl
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
    for (let k=0 ; k<capacity ; k++) {
        const b = a + 1
        const c = a + 2
        const d = a + 3
        dataElem[i + 0] = a
        dataElem[i + 1] = d
        dataElem[i + 2] = b
        dataElem[i + 3] = b
        dataElem[i + 4] = d
        dataElem[i + 5] = c
        a++
        i += 6
    }
    return dataElem
}
