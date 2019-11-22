/**
 * This is a virtual painter from which all the other will inherit.
 */
import Scene from "../scene";
import Program, { IShaders } from "../webgl/program";
export default abstract class Painter {
    private _programs;
    private _scene;
    get scene(): Scene | null;
    set scene(scene: Scene | null);
    private internalDestroy;
    protected abstract initialize(scene: Scene): void;
    protected abstract destroy(scene: Scene): void;
    abstract render(time: number): void;
    protected createProgram(shaders: IShaders, includes?: {
        [key: string]: string;
    }): Program;
    protected fatal(message: any): Error;
}
//# sourceMappingURL=painter.d.ts.map