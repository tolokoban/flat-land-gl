/**
 * Background the screen by filling it with an image that covers it entirely.
 */

import Atlas from '../../atlas'
import castString from '../../converter/string'
import Scene from '../../scene'
import Program from '../../webgl/program'
import Painter from '../painter'
import { IUniforms } from '../../types'

interface IBackgroundPainterParams {
    atlas: Atlas
    align?: string
}

const NB_VERTICES_IN_SQUARE = 4

export default class BackgroundPainter extends Painter {
    private atlas?: Atlas
    private prg?: Program
    private buff?: WebGLBuffer

    /**
     * params: { atlas, align }
     * - align: if undefined, the background will be centered.
     *          "R" means that the Right edge of the background is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    constructor(private readonly params: IBackgroundPainterParams) {
        super()
    }

    render() {
        const { scene, prg, atlas, buff } = this
        if (!scene || !prg || !atlas || !buff) { return }
        const gl = scene.gl
        gl.enable(gl.DEPTH_TEST)
        prg.use()
        atlas.activate()
        const uniforms = (prg as unknown) as IUniforms
        uniforms.$uniTexture = 0
        prg.setUniform('uniAspectRatio', scene.width / scene.height)
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
        const { params } = this
        const { atlas } = params
        this.atlas = atlas
        this.prg = this.createProgram({
            frag: FRAG,
            vert: getVert(castString(params.align).toUpperCase()),
        })
        const { gl } = scene
        const buff = gl.createBuffer()
        if (!buff) {
            throw this.fatal('Not enough memory to create an array buffer!')
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buff)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW)
        this.buff = buff
    }
}

function getVert(align: string) {
    let x = ''
    let y = ''

    if (align.indexOf('B') !== -1) {
        y = 'location.y -= uniAspectRatio - 1.0;'
    } else if (align.indexOf('T') !== -1) {
        y = 'location.y += uniAspectRatio - 1.0;'
    }
    if (align.indexOf('R') !== -1) {
        x = 'location.x -= 1.0 / uniAspectRatio - 1.0;'
    } else if (align.indexOf('L') !== -1) {
        x = 'location.x += 1.0 / uniAspectRatio - 1.0;'
    }

    return `uniform float uniAspectRatio;
attribute vec2 attXY;
varying vec2 varUV;

void main() {
  varUV = attXY;
  vec2 location = 2.0 * (attXY - vec2(0.5, 0.5));

  if (uniAspectRatio > 1.0) {
    location.y *= uniAspectRatio;${y}
  } else {
    location.x /= uniAspectRatio;${x}
  }

  gl_Position = vec4(location.x, -location.y, 0.9999999, 1.0);
}`
}

const FRAG = `precision mediump float;
uniform sampler2D uniTexture;
varying vec2 varUV;

void main() {
  vec4 color = texture2D( uniTexture, varUV );
  gl_FragColor = color;
}`
