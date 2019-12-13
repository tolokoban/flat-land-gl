export default class DynamicArray {
    private _chunkSize;
    private _chunksPerBlock;
    private _length;
    private _capacity;
    private _data;
    constructor(_chunkSize: number, _chunksPerBlock: number);
    get data(): Float32Array;
    get length(): number;
    get capacity(): number;
    getOffset(index: number): number;
    /**
     * Create a new chunk at the end of the array
     * and return Index of this new chunk.
     */
    push(chunk: Float32Array): number;
    /**
     * No check are made on index.
     */
    set(chunk: Float32Array, index: number): void;
    remove(index: number): number;
    private ensureIndexIsValid;
    private allocateNewBlock;
}
