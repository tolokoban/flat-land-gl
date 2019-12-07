import { __values } from "tslib";
import Color from './color';
describe('webgl/color', function () {
    var e_1, _a, e_2, _b;
    var validCases = ['#f37', '#FfF', '#d952', '#7833FD', '#12345678'];
    var _loop_1 = function (validCase) {
        it("should find \"" + validCase + "\" valid", function () {
            expect(Color.isValid(validCase)).toBeTruthy();
        });
    };
    try {
        for (var validCases_1 = __values(validCases), validCases_1_1 = validCases_1.next(); !validCases_1_1.done; validCases_1_1 = validCases_1.next()) {
            var validCase = validCases_1_1.value;
            _loop_1(validCase);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (validCases_1_1 && !validCases_1_1.done && (_a = validCases_1.return)) _a.call(validCases_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var invalidCases = ['#ffx', 'Truc', '', '#79', '#dd451', '#1234567'];
    var _loop_2 = function (invalidCase) {
        it("should find \"" + invalidCase + "\" invalid", function () {
            expect(Color.isValid(invalidCase)).toBeFalsy();
        });
    };
    try {
        for (var invalidCases_1 = __values(invalidCases), invalidCases_1_1 = invalidCases_1.next(); !invalidCases_1_1.done; invalidCases_1_1 = invalidCases_1.next()) {
            var invalidCase = invalidCases_1_1.value;
            _loop_2(invalidCase);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (invalidCases_1_1 && !invalidCases_1_1.done && (_b = invalidCases_1.return)) _b.call(invalidCases_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
});
//# sourceMappingURL=color.test.js.map