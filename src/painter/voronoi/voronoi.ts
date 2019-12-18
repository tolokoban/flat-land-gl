/**
 * Fill the screen with a tilable voronoi pattern.
 */
import Scene from '../../scene'
import Program from '../../webgl/program'
import Painter from '../painter'
import Vert from './voronoi.vert'
import Frag from './voronoi.frag'


const NB_VERTICES_IN_SQUARE = 4

export interface IVoronoiPainterParams {
    seeds: number[],
    colors: number[],
    // 0: no border.
    // 1: the border takes the whole region.
    border: number,
    // 0: flat.
    // 1: maximum reflection.
    light: number,
    scaleX: number,
    scaleY: number
}

export default class VoronoiPainter extends Painter {
    private prg?: Program
    private buff?: WebGLBuffer
    private seeds: Float32Array
    private colors: Float32Array
    private readonly params: IVoronoiPainterParams

    /**
     * params: { atlas, align }
     * - align: if undefined, the voronoi will be centered.
     *          "R" means that the Right edge of the voronoi is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    constructor(params: Partial<IVoronoiPainterParams>) {
        super()

        this.params = {
            seeds: randomArray(20),
            colors: randomArray(20),
            border: 0, light: 0, scaleX: 1, scaleY: 1,
            ...params
        }
        if (this.params.seeds.length % 3 !== 0) {
            throw Error(`The length of "seeds" must be an integral multiple of 3!`)
        }
        if (this.params.seeds.length !== this.params.colors.length) {
            throw Error(`"seeds" and "colors" must have the same length!`)
        }
        this.seeds = new Float32Array(this.params.seeds)
        this.colors = new Float32Array(this.params.colors)
    }

    render() {
        const { scene, prg, buff } = this
        if (!scene || !prg || !buff) { return }

        const { border, scaleX, scaleY } = this.params
        const thickness = border
        const gl = scene.gl
        gl.enable(gl.DEPTH_TEST)
        prg.use()
        prg.setUniform("uniSeeds", this.seeds)
        prg.setUniform("uniColors", this.colors)
        prg.setUniform("uniLight", this.params.light)
        prg.setUniform("uniThickness", thickness)
        prg.setUniform("uniScaleX", scaleX)
        prg.setUniform("uniScaleY", scaleY)
        prg.bindAttribs(buff, 'attXY')
        gl.bindBuffer(gl.ARRAY_BUFFER, buff)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, NB_VERTICES_IN_SQUARE)
    }

/*
    private getSeeds(time: number) {
        const { lastTime } = this;
        let alpha = (time - lastTime) / DURATION
        if (alpha > 3) {
            this.lastTime = time
            this.seeds0 = this.seeds1
            this.seeds1 = randomArray()
            alpha = 0
        }
        alpha = Math.min(alpha, 1)

        const mix = []
        const { seeds0, seeds1 } = this
        const beta = 1 - alpha
        for (let i = 0; i < seeds1.length; i++) {
            mix.push(beta * seeds0[i] + alpha * seeds1[i])
        }
        return new Float32Array(mix)
    }
*/
    protected destroy(scene: Scene) {
        const { gl } = scene
        const { buff } = this
        if (!buff) { return }
        gl.deleteBuffer(buff)
    }

    protected initialize(scene: Scene) {
        this.prg = this.createProgram(
            {
                frag: Frag,
                vert: Vert,
            }, {
                count: `const int COUNT = ${this.params.seeds.length};`
            }
        )
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


function randomArray(count: number) {
    const arr = []
    for (let i = 0; i < 3*count; i++) {
        arr.push(Math.random())
    }
    return arr
}
