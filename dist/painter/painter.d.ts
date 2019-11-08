/**
 * This is a virtual painter from which all the other will inherit.
 */
import Scene from '../scene';
export default class Painter {
    protected _name: string;
    protected scene: Scene;
    constructor(_name: string, scene: Scene);
    readonly name: string;
    render(time: number): void;
}
//# sourceMappingURL=painter.d.ts.map