/**
 * This is a virtual painter from which all the other will inherit.
 */
import Scene from '../scene';
import Program, { IShaders } from '../webgl/program';
export default abstract class Painter {
    get scene(): Scene | null;
    set scene(scene: Scene | null);
    private readonly _programs;
    private _scene;
    abstract render(time: number, delta: number): void;
    protected abstract initialize(scene: Scene): void;
    protected abstract destroy(scene: Scene): void;
    protected createProgram(shaders: IShaders, includes?: {
        [key: string]: string;
    }): Program;
    protected fatal(message?: string): Error;
    private internalDestroy;
}
