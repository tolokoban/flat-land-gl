export default function castString(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ""; }
    var t = typeof value;
    if (t === 'number' && !isNaN(value)) {
        return "" + value;
    }
    if (t === 'string')
        return value;
    return defaultValue;
}
//# sourceMappingURL=string.js.map