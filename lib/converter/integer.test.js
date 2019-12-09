// tslint:disable:no-magic-numbers
import { __read, __values } from "tslib";
import castInteger from './integer';
describe('castInteger( string )', function () {
    var e_1, _a, e_2, _b;
    var defaultValue = 666;
    var defaultValueCases = ['Prout', '*5656', 'é485'];
    var _loop_1 = function (defaultValueCase) {
        it("should return defaultValue (" + defaultValue + ") for \"" + defaultValueCase + "\"", function () {
            var result = castInteger(defaultValueCase, defaultValue);
            expect(result).toEqual(defaultValue);
        });
    };
    try {
        for (var defaultValueCases_1 = __values(defaultValueCases), defaultValueCases_1_1 = defaultValueCases_1.next(); !defaultValueCases_1_1.done; defaultValueCases_1_1 = defaultValueCases_1.next()) {
            var defaultValueCase = defaultValueCases_1_1.value;
            _loop_1(defaultValueCase);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (defaultValueCases_1_1 && !defaultValueCases_1_1.done && (_a = defaultValueCases_1.return)) _a.call(defaultValueCases_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var castCases = [
        ['', 0],
        ['8', 8],
        ['-8', -8],
        ['487421', 487421],
        ['3.141', 3],
        ['-3.141', -3],
        ['2.3e2', 230],
        ['0xFAB', 0xFAB],
        ['0b11101001000101111010111010110', 488830422],
        ['0o4517', 2383]
    ];
    var _loop_2 = function (value) {
        var _a = __read(value, 2), input = _a[0], expected = _a[1];
        it("should convert \"" + input + "\" into " + expected, function () {
            var result = castInteger(input, defaultValue);
            expect(result).toEqual(expected);
        });
    };
    try {
        for (var castCases_1 = __values(castCases), castCases_1_1 = castCases_1.next(); !castCases_1_1.done; castCases_1_1 = castCases_1.next()) {
            var value = castCases_1_1.value;
            _loop_2(value);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (castCases_1_1 && !castCases_1_1.done && (_b = castCases_1.return)) _b.call(castCases_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    it('Should round default value', function () {
        expect(castInteger('PI', 3.14)).toEqual(3);
        expect(castInteger('E', 1.618)).toEqual(2);
    });
});
//# sourceMappingURL=integer.test.js.map