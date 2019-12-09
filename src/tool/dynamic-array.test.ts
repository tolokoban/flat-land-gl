import DynamicArray from './dynamic-array'

describe('tool/dynamic-array', () => {
    describe('new block allocation', () => {
        it('should have lenght == 0 at creation', () => {
            const arr = new DynamicArray(3, 2)
            expect(arr.length).toBe(0)
        })
        it('should have capacity == 2 at creation', () => {
            const arr = new DynamicArray(3, 2)
            expect(arr.capacity).toBe(2)
        })
        it('should have lenght == 1 after 1 push', () => {
            const arr = new DynamicArray(3, 2)
            arr.push(new Float32Array([10, 11, 12]))
            expect(arr.length).toBe(1)
        })
        it('should have capacity == 2 after 1 push', () => {
            const arr = new DynamicArray(3, 2)
            arr.push(new Float32Array([10, 11, 12]))
            expect(arr.capacity).toBe(2)
        })
        it('should have lenght == 2 after 2 pushes', () => {
            const arr = new DynamicArray(3, 2)
            arr.push(new Float32Array([10, 11, 12]))
            arr.push(new Float32Array([10, 11, 12]))
            expect(arr.length).toBe(2)
        })
        it('should have capacity == 2 after 2 pushes', () => {
            const arr = new DynamicArray(3, 2)
            arr.push(new Float32Array([10, 11, 12]))
            arr.push(new Float32Array([10, 11, 12]))
            expect(arr.capacity).toBe(2)
        })
        it('should have lenght == 3 after 3 pushes', () => {
            const arr = new DynamicArray(3, 2)
            arr.push(new Float32Array([10, 11, 12]))
            arr.push(new Float32Array([10, 11, 12]))
            arr.push(new Float32Array([10, 11, 12]))
            expect(arr.length).toBe(3)
        })
        it('should have capacity == 4 after 3 pushes', () => {
            const arr = new DynamicArray(3, 2)
            arr.push(new Float32Array([10, 11, 12]))
            arr.push(new Float32Array([10, 11, 12]))
            arr.push(new Float32Array([10, 11, 12]))
            expect(arr.capacity).toBe(4)
        })
    })

    describe('remove', () => {
        it('should decrement the length', () => {
            const arr = new DynamicArray(2, 3)
            arr.push(new Float32Array([10, 11]))
            arr.push(new Float32Array([12, 13]))
            arr.push(new Float32Array([14, 15]))
            arr.remove(2)
            expect(arr.length).toBe(2)
        })
        it('should be able to remove the last item', () => {
            const arr = new DynamicArray(2, 3)
            arr.push(new Float32Array([10, 11]))
            arr.push(new Float32Array([12, 13]))
            arr.push(new Float32Array([14, 15]))
            arr.remove(2)
            const { data } = arr
            expect(data[0]).toBe(10)
            expect(data[1]).toBe(11)
            expect(data[2]).toBe(12)
            expect(data[3]).toBe(13)
        })
        it('should be able to remove the second item', () => {
            const arr = new DynamicArray(2, 3)
            arr.push(new Float32Array([10, 11]))
            arr.push(new Float32Array([12, 13]))
            arr.push(new Float32Array([14, 15]))
            arr.remove(1)
            const { data } = arr
            expect(data[0]).toBe(10)
            expect(data[1]).toBe(11)
            expect(data[2]).toBe(14)
            expect(data[3]).toBe(15)
        })
        it('should be able to remove the first item', () => {
            const arr = new DynamicArray(2, 3)
            arr.push(new Float32Array([10, 11]))
            arr.push(new Float32Array([12, 13]))
            arr.push(new Float32Array([14, 15]))
            arr.remove(0)
            const { data } = arr
            expect(data[0]).toBe(14)
            expect(data[1]).toBe(15)
            expect(data[2]).toBe(12)
            expect(data[3]).toBe(13)
        })
    })

    describe('offset', () => {
        it('should be 0 for first element', () => {
            const arr = new DynamicArray(2, 3)
            arr.push(new Float32Array([10, 11]))
            expect(arr.getOffset(0)).toBe(0)
        })
        it('should be 2 for second element', () => {
            const arr = new DynamicArray(2, 3)
            arr.push(new Float32Array([10, 11]))
            arr.push(new Float32Array([12, 13]))
            expect(arr.getOffset(1)).toBe(2)
        })
        it('should be 4 for third element', () => {
            const arr = new DynamicArray(2, 3)
            arr.push(new Float32Array([10, 11]))
            arr.push(new Float32Array([12, 13]))
            arr.push(new Float32Array([14, 15]))
            expect(arr.getOffset(2)).toBe(4)
        })
    })
})
