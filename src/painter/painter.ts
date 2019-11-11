/**
 * This is a virtual painter from which all the other will inherit.
 */

import Scene from '../scene'
import Program, { IShaders } from '../webgl/program'

let ID = 0

export interface IPainterParams {
    name?: string,
    scene: Scene
}

export default abstract class Painter {
    protected _name: string = `${ID++}`
    protected readonly scene: Scene

    constructor(params: IPainterParams) {
        if (!params.scene) throw Error('Argument "params.scene" is mandatory!')
        this.scene = params.scene
        if (typeof params.name === 'string' && params.name.length > 0) {
            this._name = params.name
        }
        this.scene.$attachPainter(this)
    }

    destroy() {
        this.scene.$detachPainter(this.name)
    }

    get name() { return this._name }

    protected createProgram(shaders: IShaders, includes:{ [key: string]: string } = {}): Program {
        return new Program(this.scene.gl, shaders, includes)
    }

    protected fatal(message: any) {
        console.error(`Fatal error in Painter "${this.name}":`, message)
        return new Error(message)
    }

    abstract render(time: number): void
}
