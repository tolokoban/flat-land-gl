/**
 * This is a virtual painter from which all the other will inherit.
 */
import Scene from "../scene";
import Program, { IShaders } from "../webgl/program";
export interface IPainterParams {
    name?: string;
    scene: Scene;
}
export default abstract class Painter {
    readonly name: string;
    protected _name: string;
    protected readonly scene: Scene;
    constructor(params: IPainterParams);
    destroy(): void;
    abstract render(time: number): void;
    protected createProgram(shaders: IShaders, includes?: {
        [key: string]: string;
    }): Program;
    protected fatal(message: any): Error;
}
//# sourceMappingURL=painter.d.ts.map