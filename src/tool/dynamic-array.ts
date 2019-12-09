export default class DynamicArray {
    private _length = 0
    private _capacity = 0
    private _data = new Float32Array()

    constructor(private _chunkSize: number,
                private _chunksPerBlock: number) {
        this._capacity = _chunksPerBlock
        this._data = new Float32Array(_chunkSize * _chunksPerBlock)
    }

    get data() { return this._data }
    get length() { return this._length }
    get capacity() { return this._capacity }

    getOffset(index: number) {
        this.ensureIndexIsValid(index)
        return index * this._chunkSize
    }

    /**
     * Create a new chunk at the end of the array
     * and return Index of this new chunk.
     */
    push(chunk: Float32Array): number {
        this._length++
        if (this._length > this._capacity) {
            this.allocateNewBlock()
        }
        const index = this._length - 1
        this.set(chunk, index)
        return index
    }

    /**
     * No check are made on index.
     */
    set(chunk: Float32Array, index: number) {
        if (chunk.length !== this._chunkSize) {
            throw Error(`You tried to put a chunk of size ${
                chunk.length
            } at index ${index}, but the expected size was ${this._chunkSize}!`)
        }
        this.data.set(chunk, this.getOffset(index))
    }

    remove(index: number) {
        this.ensureIndexIsValid(index)
        const lastIndex = this._length - 1
        const offset = index * this._chunkSize
        const begin = lastIndex * this._chunkSize
        const end = (lastIndex + 1) * this._chunkSize
        this.data.set(this.data.slice(begin, end), offset)
        this._length--
        return lastIndex
    }

    private ensureIndexIsValid(index: number) {
        if (index < 0) {
            throw Error(`'index' (${index}) must be positive or null!`)
        }
        if (index >= this._length) {
            throw Error(`'index' (${index}) must be less than actual length (${this._length})!`)
        }
    }

    private allocateNewBlock() {
        this._capacity += this._chunksPerBlock
        const data = new Float32Array(this._capacity * this._chunkSize)
        data.set(this._data)
        this._data = data
    }
}
