export default function castBoolean(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    switch (typeof v) {
        case "undefined":
            return defaultValue;
        case "boolean":
            return v;
        case "number":
            return v !== 0;
        case "string":
            var text = v.trim().toLowerCase();
            if (text === 'true' || text === 'yes')
                return true;
            var num = parseInt(text);
            if (!isNaN(num))
                return num !== 0;
            return false;
        default:
            return false;
    }
}
//# sourceMappingURL=boolean.js.map