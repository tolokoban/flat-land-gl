import Program from './webgl/program';
interface IInternalStuff {
    texture: number;
    program: Program;
}
export interface IFrameInput {
    image: string;
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    visible: boolean;
}
export interface IFrame extends IFrameInput {
    $: IInternalStuff;
    prg: Program;
}
export default class FlatLand {
    private canvas;
    private readonly gl;
    private readonly atlases;
    private readonly programs;
    private isRendering;
    private asyncActions;
    private isProcessingAsynActions;
    constructor(canvas: HTMLCanvasElement);
    private pushAsyncAction;
    private processAsyncActions;
    private processAsyncActionAtlas;
    private processAsyncActionProgram;
    initialize(): Promise<void>;
    private initBuff;
    createFrame(opt: Partial<IFrameInput>): IFrame;
    start(): void;
    stop(): void;
    private render;
}
export {};
//# sourceMappingURL=flat-land.d.ts.map