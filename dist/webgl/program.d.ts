export interface IShaders {
    vert: string;
    frag: string;
}
interface IAttrib extends WebGLActiveInfo {
    typeName: string;
    length: number;
    location: number;
}
interface IAttribsDic {
    [key: string]: IAttrib;
}
interface IUniformsDic {
    [key: string]: WebGLUniformLocation;
}
/**
 * Creating  a  WebGL  program  for shaders  is  painful.  This  class
 * simplifies the process.
 *
 * @class Program
 *
 * Object properties starting with `$` are WebGL uniforms or attributes.
 * Uniforms behave as expected: you can read/write a value.
 * Attributes when read, return the location. And when written, enable/disabled
 * this attribute. So you read integers and writte booleans.
 *
 * @param gl - WebGL context.
 * @param codes  - Object  with two  mandatory attributes:  `vert` for
 * vertex shader and `frag` for fragment shader.
 * @param  includes  -  (optional)  If  defined,  the  `#include  foo`
 * directives  of  shaders   will  be  replaced  by   the  content  of
 * `includes.foo`.
 */
export default class Program {
    readonly gl: WebGLRenderingContext;
    readonly BPE: number;
    readonly program: WebGLProgram;
    private _typesNamesLookup;
    readonly attribs: IAttribsDic;
    readonly uniforms: IUniformsDic;
    constructor(gl: WebGLRenderingContext, codes: IShaders, includes?: {
        [key: string]: string;
    });
    private createAttributes;
    private getSize;
    use(): void;
    getTypeName(typeId: number): string;
    bindAttribs(buffer: WebGLBuffer, ...names: string[]): void;
    setUniform(name: string, value: any): void;
    private createUniforms;
    private createUniformSetter;
    private createUniformGetter;
}
export {};
//# sourceMappingURL=program.d.ts.map