/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Texture from '../../texture/cube-map-texture'
import SpaceCamera from '../../camera/space'
import PerspectiveCamera from '../../camera/perspective'
import Scene from '../../scene'
import Program from '../../webgl/program'
import Painter from '../painter'

import frag from './cube-map.frag'
import vert from './cube-map.vert'

interface IBackgroundPainterParams {
    texture: Texture,
    camera?: SpaceCamera
}

const NB_VERTICES_IN_SQUARE = 4
const VECTOR3_LENGTH = 3
const MATRIX3_LENGTH = 9
const X_INDEX = 0
const Y_INDEX = 1
const Z_INDEX = 2

export default class BackgroundPainter extends Painter {
    private readonly texture: Texture
    private readonly camera: SpaceCamera
    private prg?: Program
    private buff?: WebGLBuffer
    private direction = new Float32Array(VECTOR3_LENGTH)
    private rotationMatrix = new Float32Array(MATRIX3_LENGTH)
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
        this.texture = params.texture
        this.x = 0
        this.y = 0
        this.z = -1
        if (params.camera) {
            this.camera = params.camera
        } else {
            const camera = new PerspectiveCamera()
            this.camera = camera
        }
    }

    get x() { return this.direction[X_INDEX] }
    set x(v: number) { this.direction[X_INDEX] = v }
    get y() { return this.direction[Y_INDEX] }
    set y(v: number) { this.direction[Y_INDEX] = v }
    get z() { return this.direction[Z_INDEX] }
    set z(v: number) { this.direction[Z_INDEX] = v }

    render(time: number, delta: number) {
        const { scene, prg, texture, buff, camera } = this
        if (!scene || !prg || !buff) { return }
        const gl = scene.gl
        const savedDepthFunc = gl.getParameter(gl.DEPTH_FUNC)

        gl.depthFunc(gl.LEQUAL)
        gl.enable(gl.DEPTH_TEST)

        prg.use()
        camera.setUniformValues(prg, scene.width, scene.height, time, delta)
        texture.attachToUnit(0)
        const uniforms = prg.uniforms
        uniforms.uniTexture = 0
        uniforms.uniSceneAspectRatio = scene.width / scene.height
        uniforms.uniRotation = this.rotationMatrix
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
        const { camera } = this
        this.prg = this.createProgram({ frag, vert }, camera.getShaderIncludes())
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
