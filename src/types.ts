export type IAtom = number | string | boolean | Float32Array

export interface IExtra {
    [key: string]: IExtra | IAtom[] | IAtom
}

export interface IUniforms {
    [key: string]: IAtom
}

export type IVec3 = Float32Array
export type IVec4 = Float32Array
export type IMat3 = Float32Array
export type IMat4 = Float32Array
