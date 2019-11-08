export default function castObject(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = {}; }
    if (typeof v !== 'object')
        return defaultValue;
    if (Array.isArray(v))
        return defaultValue;
    return v;
}
//# sourceMappingURL=object.js.map