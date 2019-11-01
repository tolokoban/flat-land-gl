import Program from './webgl/program'
import Atlas from './atlas'
import { fetchAssets } from './webgl/tools'

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

interface IAsyncActionAtlas  {
    type: "atlas",
    name: string,
    url: string
}

interface IAsyncActionProgram  {
    type: "program",
    name: string,
    vertURL: string,
    fragURL: string
}

type IAsyncAction = IAsyncActionAtlas | IAsyncActionProgram

export default class FlatLand {
    private readonly gl: WebGLRenderingContext
    private readonly atlases: Map<string, Atlas>
    private readonly programs: Map<string, Program>
    private isRendering = false
    private asyncActions: IAsyncAction[] = []
    private isProcessingAsynActions = false

    constructor(private canvas: HTMLCanvasElement) {
        const gl = canvas.getContext("webgl", {
            // Specify WebGL options.
        })
        if (!gl) throw "Unable to create a WegGL context!"

        this.gl = gl
        this.atlases = new Map()
        this.programs = new Map()

        this.pushAsyncAction({
            type: "program",
            name: "_frame",
            vertURL: FrameVertexShader,
            fragURL: FrameFragmentShader
        })
    }

    private pushAsyncAction(action: IAsyncAction) {
        this.asyncActions.push(action)
        if (!this.isProcessingAsynActions) {
            window.requestAnimationFrame(this.processAsyncActions)
        }
    }

    private async processAsyncActions() {
        this.isProcessingAsynActions = true
        while (this.asyncActions.length > 0) {
            const action = this.asyncActions.shift()
            if (!action) continue
            if (action.type === "atlas") {
                await this.processAsyncActionAtlas(action)
            }
        }
    }

    private async processAsyncActionAtlas(action: IAsyncActionAtlas) {

    }

    private async processAsyncActionProgram(action: IAsyncActionProgram) {
        const shaders = await fetchAssets({
            vert: action.vertURL,
            frag: action.fragURL
        })
        const prg = new Program(shaders)
        this.programs.set('_frame', prg)
    }

    async initialize() {
        if (this.isInitialized) return
        this.initBuff()
        this.isInitialized = true
    }

    private initBuff() {

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
        if (this.isRendering) window.requestAnimationFrame(this.render)
        else return

        // @TODO
    }
}


async function sleep(timeInMilliseconds: number) {
    return new Promise(resolve => window.setTimeout(resolve, timeInMilliseconds))
}
