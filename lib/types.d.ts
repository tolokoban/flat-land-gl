export declare type IAtom = number | string | boolean | Float32Array;
export interface IExtra {
    [key: string]: IExtra | IAtom[] | IAtom;
}
export interface IUniforms {
    [key: string]: IAtom;
}
