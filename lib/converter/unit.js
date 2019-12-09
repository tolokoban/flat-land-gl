// tslint:disable:no-any
var RX_CSS_UNIT = /^(-?[.0-9]+)[ \n\r]*([a-z%]*)/;
var SCALAR_INDEX = 1;
var UNIT_INDEX = 2;
export default function castUnit(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = '100%'; }
    if (typeof v === 'number') {
        return v + "px";
    }
    if (typeof v !== 'string') {
        return defaultValue;
    }
    var text = ("" + v).trim().toLowerCase();
    if (text === 'auto' || text === 'inherit') {
        return text;
    }
    if (text.startsWith('calc(')) {
        return text;
    }
    var m = RX_CSS_UNIT.exec(text);
    if (!m) {
        return defaultValue;
    }
    var scalar = Number(m[SCALAR_INDEX]);
    if (isNaN(scalar) || scalar === 0) {
        return '0';
    }
    var unit = m[UNIT_INDEX].length < 1 ? 'px' : m[UNIT_INDEX];
    return "" + scalar + unit;
}
//# sourceMappingURL=unit.js.map