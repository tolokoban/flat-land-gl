import Calc from './calc';
describe("Calc", function () {
    describe("vector", function () {
        describe("areEqual", function () {
            it("should be the same function for vector and matrix", function () {
                expect(Calc.vector.areEqual).toBe(Calc.matrix.areEqual);
            });
            it("should work", function () {
                var a = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                var b = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                expect(Calc.vector.areEqual(a, b)).toBe(true);
            });
        });
        describe("cross3", function () {
            it("should be right-handed", function () {
                var x = new Float32Array([1, 0, 0]);
                var y = new Float32Array([0, 1, 0]);
                var result = new Float32Array(3);
                Calc.vector.cross3(x, y, result);
                var z = new Float32Array([0, 0, 1]);
                expect(Calc.vector.areEqual(z, result)).toBe(true);
            });
            it("should work", function () {
                var x = new Float32Array([1, 2, 3]);
                var y = new Float32Array([4, 5, 6]);
                var result = new Float32Array(3);
                Calc.vector.cross3(x, y, result);
                var expected = new Float32Array([-3, 6, -3]);
                expect(Calc.vector.areEqual(result, expected)).toBe(true);
            });
        });
        describe("dot3", function () {
            it("should work", function () {
                var x = new Float32Array([1, 2, 3]);
                var y = new Float32Array([4, 5, 6]);
                var result = Calc.vector.dot3(x, y);
                var expected = 32;
                expect(result).toBe(expected);
            });
        });
    });
    describe("matrix", function () {
        describe("multiply3", function () {
            it("shoud work", function () {
                var x = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                var y = new Float32Array([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
                var result = new Float32Array(9);
                Calc.matrix.multiply3(x, y, result);
                var expected = new Float32Array([
                    -30, -39, -48,
                    6, 6, 6,
                    42, 51, 60
                ]);
                expect(result).toEqual(expected);
            });
        });
        describe("multiply4", function () {
            it("shoud work", function () {
                var x = new Float32Array([
                    1, 2, 3, 4,
                    5, 6, 7, 8,
                    9, 10, 11, 12,
                    13, 14, 15, 16
                ]);
                var y = new Float32Array([
                    -4, -3, -2, -1,
                    7, 2, 3, -10,
                    1, 2, 3, 4,
                    -12, 0, 6, 8
                ]);
                var result = new Float32Array(16);
                Calc.matrix.multiply4(x, y, result);
                var expected = new Float32Array([
                    -50, -60, -70, -80,
                    -86, -84, -82, -80,
                    90, 100, 110, 120,
                    146, 148, 150, 152
                ]);
                expect(result).toEqual(expected);
            });
        });
        describe("invert4", function () {
            it("shoud work", function () {
                var x = new Float32Array([
                    1, 2, 3, 4,
                    5, 2, 7, 8,
                    9, 10, 3, 12,
                    13, 14, 15, 4
                ]);
                var result = new Float32Array(16);
                var possible = Calc.matrix.invert4(x, result);
                expect(possible).toEqual(true);
                var expected = new Float32Array([
                    -89 / 168, 5 / 28, 3 / 56, 1 / 84,
                    2 / 7, -3 / 14, 1 / 28, 1 / 28,
                    9 / 56, 1 / 28, -5 / 56, 1 / 28,
                    5 / 42, 1 / 28, 1 / 28, -1 / 21
                ]);
                expect(result).toEqual(expected);
            });
        });
    });
});
//# sourceMappingURL=calc.test.js.map