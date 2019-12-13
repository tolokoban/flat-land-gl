var DynamicArray = /** @class */ (function () {
    function DynamicArray(_chunkSize, _chunksPerBlock) {
        this._chunkSize = _chunkSize;
        this._chunksPerBlock = _chunksPerBlock;
        this._length = 0;
        this._capacity = 0;
        this._data = new Float32Array();
        this._capacity = _chunksPerBlock;
        this._data = new Float32Array(_chunkSize * _chunksPerBlock);
    }
    Object.defineProperty(DynamicArray.prototype, "data", {
        get: function () { return this._data; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicArray.prototype, "length", {
        get: function () { return this._length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicArray.prototype, "capacity", {
        get: function () { return this._capacity; },
        enumerable: true,
        configurable: true
    });
    DynamicArray.prototype.getOffset = function (index) {
        this.ensureIndexIsValid(index);
        return index * this._chunkSize;
    };
    /**
     * Create a new chunk at the end of the array
     * and return Index of this new chunk.
     */
    DynamicArray.prototype.push = function (chunk) {
        this._length++;
        if (this._length > this._capacity) {
            this.allocateNewBlock();
        }
        var index = this._length - 1;
        this.set(chunk, index);
        return index;
    };
    /**
     * No check are made on index.
     */
    DynamicArray.prototype.set = function (chunk, index) {
        if (chunk.length !== this._chunkSize) {
            throw Error("You tried to put a chunk of size " + chunk.length + " at index " + index + ", but the expected size was " + this._chunkSize + "!");
        }
        this.data.set(chunk, this.getOffset(index));
    };
    DynamicArray.prototype.remove = function (index) {
        this.ensureIndexIsValid(index);
        var lastIndex = this._length - 1;
        var offset = index * this._chunkSize;
        var begin = lastIndex * this._chunkSize;
        var end = (lastIndex + 1) * this._chunkSize;
        this.data.set(this.data.slice(begin, end), offset);
        this._length--;
        return lastIndex;
    };
    DynamicArray.prototype.ensureIndexIsValid = function (index) {
        if (index < 0) {
            throw Error("'index' (" + index + ") must be positive or null!");
        }
        if (index >= this._length) {
            throw Error("'index' (" + index + ") must be less than actual length (" + this._length + ")!");
        }
    };
    DynamicArray.prototype.allocateNewBlock = function () {
        this._capacity += this._chunksPerBlock;
        var data = new Float32Array(this._capacity * this._chunkSize);
        data.set(this._data);
        this._data = data;
    };
    return DynamicArray;
}());
export default DynamicArray;
//# sourceMappingURL=dynamic-array.js.map