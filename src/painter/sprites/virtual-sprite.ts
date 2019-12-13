import { IExtra } from '../../types'

export type IUpdateFunction = (obj: any, data: Float32Array) => void
export type IDestroyFunction = (obj: any) => void



export default abstract class VirtualSprite {
    $index = -1
    readonly extra: IExtra = {}
    protected readonly _data: Float32Array
    protected readonly _id: string
    protected readonly _update: IUpdateFunction
    protected readonly _destroy: IDestroyFunction

    constructor(id: string, data: Float32Array,
        update: IUpdateFunction, destroy: IDestroyFunction) {
        this._id = id
        this._data = data
        this._update = update
        this._destroy = destroy
    }

    get id() { return this._id }

    destroy() { this._destroy(this) }

    abstract update(): void
}
