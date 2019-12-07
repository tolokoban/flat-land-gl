// tslint:disable:no-any
export default function castArray(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = []; }
    if (typeof v === 'undefined') {
        return defaultValue;
    }
    if (Array.isArray(v)) {
        return v;
    }
    return [v];
}
//# sourceMappingURL=array.js.map