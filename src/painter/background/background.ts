/**
 * Background the screen by filling it with an image that covers it entirely.
 */
import Painter from '../painter'
import Scene from '../../scene'
import Atlas from '../../atlas'
import Program from '../../webgl/program'

interface IBackgroundPainterParams {
    atlasName: string
}

export default class BackgroundPainter extends Painter {
    private readonly atlas: Atlas
    private readonly prg: Program
    private readonly buff: WebGLBuffer

    constructor(name: string, scene: Scene, params: IBackgroundPainterParams) {
        super(name, scene)
        const { atlasName } = params
        const atlas = scene.getAtlas(atlasName)
        if (!atlas) {
            throw this.fatal(`Atlas "${atlasName}" not found!`)
        }

        this.atlas = atlas
        this.prg = this.createProgram({
            vert: VERT, frag: FRAG
        })
        const { gl } = scene
        const buff = gl.createBuffer();
        if (!buff) {
            throw this.fatal("Not enough memory to create an array buffer!")
        }

        gl.bindBuffer( gl.ARRAY_BUFFER, buff )
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array([
            0,0, 0,1, 1,0, 1,1
        ]), gl.STATIC_DRAW );
        this.buff = buff
    }

    render() {
        const { scene, prg, atlas, buff } = this
        const gl = scene.gl
        gl.disable(gl.DEPTH_TEST)
        prg.use()
        atlas.activate()
        const uniforms = prg as {[key: string]: any}
        uniforms.$uniTexture = 0
        prg.setUniform("uniAspectRatio", scene.width / scene.height)
        prg.bindAttribs(buff, "attXY")
        gl.bindBuffer( gl.ARRAY_BUFFER, buff )
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
}


const VERT = `uniform float uniAspectRatio;
attribute vec2 attXY;
varying vec2 varUV;

void main() {
  varUV = attXY;
  vec2 location = 2.0 * (attXY - vec2(0.5, 0.5));
  if (uniAspectRatio > 1.0) {
    location.y = uniAspectRatio;
  } else {
    location.x = -uniAspectRatio;
  }

  gl_Position = vec4(location.x, -location.y, -1.0, 1.0);
}`

const FRAG = `precision mediump float;
uniform sampler2D uniTexture;
varying vec2 varUV;

void main() {
  vec4 color = texture2D( uniTexture, varUV );
  gl_FragColor = color;
}`
