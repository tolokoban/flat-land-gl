/**
 * This is a virtual painter from which all the other will inherit.
 */
import Scene from "../scene"
import Program, { IShaders } from "../webgl/program"

export default abstract class Painter {
    private _programs: Program[] = []
    private _scene: Scene | null = null

    public get scene() { return this._scene }
    public set scene(scene: Scene | null) {
        if (scene === this._scene) return
        if (this._scene) {
            this.internalDestroy(this._scene)
        }
        this._scene = scene
        if (scene) {
            this.initialize(scene)
        }
    }

    private internalDestroy(scene: Scene) {
        const { gl } = scene
        for (const prg of this._programs) {
            gl.deleteProgram(prg)
        }
    }

    protected abstract initialize(scene: Scene): void
    protected abstract destroy(scene: Scene): void

    public abstract render(time: number): void

    protected createProgram(shaders: IShaders, includes: { [key: string]: string } = {}): Program {
        const scene = this._scene
        if (!scene) {
            throw Error("This painter has no scene!\ncreateProfram() should only be called from initialize().")
        }
        const prg = new Program(scene.gl, shaders, includes)
        this._programs.push(prg)
        return prg
    }

    protected fatal(message: any) {
        console.error(`Fatal error in Painter:`, message)
        return new Error(message)
    }
}
