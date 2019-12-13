import { IExtra } from '../../types';
export declare type IUpdateFunction = (obj: any, data: Float32Array) => void;
export declare type IDestroyFunction = (obj: any) => void;
export default abstract class VirtualSprite {
    $index: number;
    readonly extra: IExtra;
    protected readonly _data: Float32Array;
    protected readonly _id: string;
    protected readonly _update: IUpdateFunction;
    protected readonly _destroy: IDestroyFunction;
    constructor(id: string, data: Float32Array, update: IUpdateFunction, destroy: IDestroyFunction);
    get id(): string;
    destroy(): void;
    abstract update(): void;
}
