/**
 * This is a virtual painter from which all the other will inherit.
 */
import Scene from '../scene'
import Program, { IShaders } from '../webgl/program'

export default abstract class Painter {
    get scene() {
        return this._scene
    }
    set scene(scene: Scene | null) {
        if (scene === this._scene) { return }
        if (this._scene) {
            this.internalDestroy(this._scene)
        }
        this._scene = scene
        if (scene) {
            this.initialize(scene)
        }
    }
    private readonly _programs: Program[] = []
    private _scene: Scene | null = null

    abstract render(time: number, delta: number): void

    protected abstract initialize(scene: Scene): void
    protected abstract destroy(scene: Scene): void

    protected createProgram(shaders: IShaders, includes: { [key: string]: string } = {}): Program {
        const scene = this._scene
        if (!scene) {
            throw Error(
                'This painter has no scene!\ncreateProfram() should only be called from initialize().'
            )
        }
        const prg = new Program(scene.gl, shaders, includes)
        this._programs.push(prg)
        return prg
    }

    protected fatal(message?: string) {
        console.error(`Fatal error in Painter:`, message)
        return new Error(message)
    }

    private internalDestroy(scene: Scene) {
        const { gl } = scene
        for (const prg of this._programs) {
            gl.deleteProgram(prg)
        }
    }
}
