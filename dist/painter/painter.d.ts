/**
 * This is a virtual painter from which all the other will inherit.
 */
import Scene from '../scene';
import Program, { IShaders } from '../webgl/program';
export default abstract class Painter {
    protected _name: string;
    protected scene: Scene;
    constructor(_name: string, scene: Scene);
    destroy(): void;
    readonly name: string;
    protected createProgram(shaders: IShaders, includes?: {
        [key: string]: string;
    }): Program;
    protected fatal(message: any): void;
    abstract render(time: number): void;
}
//# sourceMappingURL=painter.d.ts.map