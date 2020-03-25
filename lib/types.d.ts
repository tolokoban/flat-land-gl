export declare type IAtom = number | string | boolean | Float32Array;
export interface IExtra {
    [key: string]: IExtra | IAtom[] | IAtom;
}
export interface IUniforms {
    [key: string]: IAtom;
}
export declare type IVec3 = Float32Array;
export declare type IVec4 = Float32Array;
export declare type IMat3 = Float32Array;
export declare type IMat4 = Float32Array;
