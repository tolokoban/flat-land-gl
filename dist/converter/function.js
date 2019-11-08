var EMPTY_FUNCTION = function () { };
export default function castBoolean(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = EMPTY_FUNCTION; }
    if (typeof value === 'function')
        return value;
    return defaultValue;
}
//# sourceMappingURL=function.js.map