// tslint:disable:no-any
var EMPTY_FUNCTION = function () {
    /* The empty function, obviously, is empty. */
};
export default function castFunction(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = EMPTY_FUNCTION; }
    if (typeof value === 'function') {
        return value;
    }
    return defaultValue;
}
//# sourceMappingURL=function.js.map