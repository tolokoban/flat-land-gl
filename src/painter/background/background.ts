/**
 * Background the screen by filling it with an image that covers it entirely.
 */

import Atlas from '../../atlas'
import Scene from '../../scene'
import Program from '../../webgl/program'
import Painter from '../painter'
import { IUniforms } from '../../types'

import frag from './background.frag'
import vert from './background.vert'

interface IBackgroundPainterParams {
    atlas: Atlas
    alignX?: number
    alignY?: number
    scale?: number
}

const NB_VERTICES_IN_SQUARE = 4

export default class BackgroundPainter extends Painter {
    private atlas?: Atlas
    private prg?: Program
    private buff?: WebGLBuffer

    alignX = 0.5
    alignY = 0.5
    scale = 1

    /**
     * params: { atlas, align }
     * - alignX: Float number between 0 and 1.
     *   Imagine the background is wider than the screen of K pixels.
     *   Then we will shift the background from K * alignX pixels to the left.
     * - alignY: Same for Y axis.
     * If alignX = 0.5 and alignY = 0.5, the background is perfectly centered.
     */
    constructor(params: IBackgroundPainterParams) {
        super()
        const options = {
            alignX: 0.5, alignY: 0.5, scale: 1, ...params
        }
        this.alignX = options.alignX
        this.alignY = options.alignY
        this.scale = options.scale
        this.atlas = params.atlas
    }

    render() {
        const { scene, prg, atlas, buff, alignX, alignY, scale } = this
        if (!scene || !prg || !atlas || !buff) { return }
        const gl = scene.gl
        gl.enable(gl.DEPTH_TEST)
        prg.use()
        atlas.activate()
        const uniforms = (prg as unknown) as IUniforms
        uniforms.$uniTexture = 0
        prg.setUniform('uniSceneAspectRatio', scene.width / scene.height)
        prg.setUniform('uniImageAspectRatio', atlas.width / atlas.height)
        prg.setUniform('uniAlignX', alignX)
        prg.setUniform('uniAlignY', alignY)
        prg.setUniform('uniScale', scale)
        prg.bindAttribs(buff, 'attXY')
        gl.bindBuffer(gl.ARRAY_BUFFER, buff)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, NB_VERTICES_IN_SQUARE)
    }

    protected destroy(scene: Scene) {
        const { gl } = scene
        const { buff } = this
        if (!buff) { return }
        gl.deleteBuffer(buff)
    }

    protected initialize(scene: Scene) {
        console.log(vert)
        console.log(frag)
        this.prg = this.createProgram({ frag, vert })
        const { gl } = scene
        const buff = gl.createBuffer()
        if (!buff) {
            throw this.fatal('Not enough memory to create an array buffer!')
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buff)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, +1,
            -1, -1,
            +1, +1,
            +1, -1
        ]), gl.STATIC_DRAW)
        this.buff = buff
    }
}
