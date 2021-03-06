// tslint:disable:no-any
// tslint:disable:ban
var NUMBER_PREFIX_LENGTH = 2;
export default function castDouble(v, defVal) {
    if (defVal === void 0) { defVal = 0; }
    switch (typeof v) {
        case 'boolean':
            return v ? 1 : 0;
        case 'number':
            return v;
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
            return num;
        default:
            return defVal;
    }
}
//# sourceMappingURL=double.js.map