export default class Atlas {
    private gl;
    private name;
    private readonly texture;
    private _isReady;
    constructor(gl: WebGLRenderingContext, name: string);
    readonly isReady: boolean;
    loadImage(url: string): Promise<string>;
}
//# sourceMappingURL=atlas.d.ts.map