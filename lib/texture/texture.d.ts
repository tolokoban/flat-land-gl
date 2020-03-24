declare type ITarget = "2d" | "cubeMap" | "3d" | "2dArray";
export default abstract class Texture {
    protected readonly gl: WebGL2RenderingContext;
    protected readonly id: string;
    private sharingCounter;
    private _isDestroyed;
    protected readonly texture: WebGLTexture;
    protected readonly target: GLenum;
    protected readonly units: GLenum[];
    constructor(gl: WebGL2RenderingContext, id: string, target: ITarget);
    get isDestroyed(): boolean;
    /**
     * Many painters can share the same texture.
     * For memory management, it's important to know
     * how many users this texture has to be shared with.
     *
     * Call share() as soon as you need to use a texture
     * and destroy() as soon as you don't need it anymore.
     */
    share(): void;
    /**
     * Remove the texture from the graphic card memory
     * as soon as no one is using it anymore.
     */
    destroy(): void;
    /**
     * Attach this texture to a unit.
     * If you use only one unit, your texture must be attached to unit 0.
     */
    attachToUnit(unitIndex: number): void;
}
export {};
