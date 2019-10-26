import Program from './webgl/program'
import fetchAssets from './webgl/tools'

import FrameVertexShader from './shader/frame.vert'
import FrameFragmentShader from './shader/frame.frag'

interface IInternalStuff {
    texture: number,
    program: Program
}

export interface IFrameInput {
    image: string,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    visible: boolean
}

export interface IFrame extends IFrameInput {
    $: IInternalStuff,
    prg: Program
}

interface ITexture {
    name: string,
    texture: number
}

export default class FlatLand {
    private readonly gl
    private readonly textures: Map<string, ITexture>
    private readonly frames: IFrame[]
    private readonly programs: Map<string, Program>
    private isInitialized = false
    private isRendering = false

    contructor(private canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl", {
            // Specify WebGL options.
        })
        this.textures = new Map()
        this.frames = []
        this.programs = new Map()
    }

    async initialize() {
        if (this.isInitialized) return
        const shaders = await fetchAssets({
            vert: FrameVertexShader,
            frag: FrameFragmentShader
        })
        const prg = new Program(shaders)
        this.programs.set('_frame', prg)
        this.initBuff()
        this.isInitialized = true
    }

    private initBuff() {
        
    }

    private ensureInit() {
        if (this.isInitialized) return
        console.error("[flat-land-gl] This object is not yet initialized!")
        console.error("    const f = new FlatLand(canvas)")
        console.error("    await f.initialize()")
        throw Error("[flat-land-gl] This object is not yet initialized!")
    }

    async loadImageFromURL(name: string, url: string) {
        this.ensureInit()

        const { gl, textures } = this
        return new Promise((resolve, reject) => {
            const texture = gl.createTexture()

            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

            textures.set(name, { name, texture })

            const img = new Image()
            img.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, texture)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
                resolve(name)
            }
            img.onerror = () => {
                reject(name)
            }
            img.src = url
        })
    }

    createFrame(opt: Partial<IFrameInput>): IFrame {
        this.ensureInit()

        if (!this.textures.has(opt.image)) {
            throw Error(`[flat-land-gl/createFrame()] Image "" does not exist yet!`)
        }
        const prg = this.programs.get("_frame")
        const frame = {
            x: 0, y: 0, z: 0,
            width: 300, height: 200,
            visible: true,
            ...opt,
            $: {
                texture: this.textures.gt(opt.image),
                program: prg
            }
        }
        this.frames.push(frame)
        return frame
    }

    start() {
        if (this.isRendering) return
        this.isRendering = true
        window.requestAnimationFrame(this.render)
    }

    stop() {
        this.isRendering = false
    }

    private render = (time: number) => {
        const { gl, buff } = this
    }
}
