export default function castInteger(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var defVal = Math.floor(.5 + defaultValue);
    switch (typeof v) {
        case "boolean":
            return v ? 1 : 0;
        case "number":
            return Math.floor(.5 + v);
        case "string":
            var text = v.trim().toLowerCase();
            if (text.startsWith("0x")) {
                var hexa = parseInt(text.substr(2), 16);
                return isNaN(hexa) ? defVal : hexa;
            }
            if (text.startsWith("0b")) {
                var hexa = parseInt(text.substr(2), 2);
                return isNaN(hexa) ? defVal : hexa;
            }
            if (text.startsWith("0o")) {
                var hexa = parseInt(text.substr(2), 8);
                return isNaN(hexa) ? defVal : hexa;
            }
            var num = parseFloat(text);
            if (isNaN(num))
                return defVal;
            return Math.floor(.5 + num);
        default:
            return defVal;
    }
}
//# sourceMappingURL=integer.js.map