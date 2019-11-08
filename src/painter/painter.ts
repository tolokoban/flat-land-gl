/**
 * This is a virtual painter from which all the other will inherit.
 */

import Scene from '../scene'
import Program, { IShaders } from '../webgl/program'

export default abstract class Painter {
    constructor(protected _name: string, protected scene: Scene) {
        scene.$attachPainter(this)
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
        throw Error(message)
    }

    abstract render(time: number): void
}
