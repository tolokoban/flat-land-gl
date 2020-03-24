/**
 * Background the screen by filling it with an image that covers it entirely.
 */

import Texture from '../../texture/image-texture'
import Scene from '../../scene'
import Program from '../../webgl/program'
import Painter from '../painter'
import { IUniforms } from '../../types'

import frag from './background.frag'
import vert from './background.vert'

interface IBackgroundPainterParams {
    texture: Texture
    alignX?: number
    alignY?: number
    scale?: number
}

const NB_VERTICES_IN_SQUARE = 4

export default class BackgroundPainter extends Painter {
    private readonly texture: Texture
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
        this.texture = params.texture
    }

    render() {
        const { scene, prg, texture, buff, alignX, alignY, scale } = this
        if (!scene || !prg || !buff) { return }
        const gl = scene.gl
        const savedDepthFunc = gl.getParameter(gl.DEPTH_FUNC)

        gl.depthFunc(gl.LEQUAL)
        gl.enable(gl.DEPTH_TEST)

        prg.use()
        texture.attachToUnit(0)
        const uniforms = (prg as unknown) as IUniforms
        uniforms.$uniTexture = 0
        prg.setUniform('uniSceneAspectRatio', scene.width / scene.height)
        prg.setUniform('uniImageAspectRatio', texture.width / texture.height)
        prg.setUniform('uniAlignX', alignX)
        prg.setUniform('uniAlignY', alignY)
        prg.setUniform('uniScale', scale)
        prg.bindAttribs(buff, 'attXY')
        gl.bindBuffer(gl.ARRAY_BUFFER, buff)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, NB_VERTICES_IN_SQUARE)

        gl.depthFunc(savedDepthFunc)
    }

    protected destroy(scene: Scene) {
        const { gl } = scene
        const { buff } = this
        if (!buff) { return }
        gl.deleteBuffer(buff)
    }

    protected initialize(scene: Scene) {
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
