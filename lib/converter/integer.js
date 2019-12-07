// tslint:disable:no-any
// tslint:disable:ban
var NUMBER_PREFIX_LENGTH = 2;
var HALF = 0.5;
export default function castInteger(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var defVal = Math.floor(HALF + defaultValue);
    switch (typeof v) {
        case 'boolean':
            return v ? 1 : 0;
        case 'number':
            return Math.floor(HALF + v);
        case 'string':
            var text = v.trim().toLowerCase();
            if (text.startsWith('0x')) {
                var hexa = parseInt(text.substr(NUMBER_PREFIX_LENGTH), 16);
                return isNaN(hexa) ? defVal : hexa;
            }
            if (text.startsWith('0b')) {
                var hexa = parseInt(text.substr(NUMBER_PREFIX_LENGTH), 2);
                return isNaN(hexa) ? defVal : hexa;
            }
            if (text.startsWith('0o')) {
                var hexa = parseInt(text.substr(NUMBER_PREFIX_LENGTH), 8);
                return isNaN(hexa) ? defVal : hexa;
            }
            var num = Number(text);
            if (isNaN(num)) {
                return defVal;
            }
            return Math.floor(HALF + num);
        default:
            return defVal;
    }
}
//# sourceMappingURL=integer.js.map