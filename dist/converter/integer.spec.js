var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import castInteger from "./integer";
describe("castInteger( string )", function () {
    var defaultValue = 666;
    ["", "Prout", "*5656", "é485"].forEach(function (value) {
        it("should return defaultValue (" + defaultValue + ") for \"" + value + "\"", function () {
            var result = castInteger(value, defaultValue);
            expect(result).toEqual(defaultValue);
        });
    });
    [
        ["8", 8],
        ["-8", -8],
        ["487421", 487421],
        ["3.141", 3],
        ["-3.141", -3],
        ["2.3e2", 230],
        ["0xFAB", 0xFAB],
        ["0b11101001000101111010111010110", 488830422],
        ["0o4517", 2383]
    ].forEach(function (testCase) {
        var _a = __read(testCase, 4), input = _a[0], string = _a[1], expected = _a[2], number = _a[3];
        it("should convert \"" + input + "\" into " + expected, function () {
            var result = castInteger(input, defaultValue);
            expect(result).toEqual(expected);
        });
    });
    it("Should round default value", function () {
        expect(castInteger("PI", 3.14)).toEqual(3);
        expect(castInteger("E", 1.618)).toEqual(2);
    });
});
//# sourceMappingURL=integer.spec.js.map