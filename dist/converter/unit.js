var RX_CSS_UNIT = /^(-?[.0-9]+)[ \n\r]*([a-z%]*)/;
export default function castUnit(v, defaultValue) {
    if (defaultValue === void 0) { defaultValue = "100%"; }
    if (typeof v === 'number')
        return v + "px";
    if (typeof v !== 'string')
        return defaultValue;
    var text = ("" + v).trim().toLowerCase();
    if (text === 'auto' || text === 'inherit')
        return text;
    if (text.startsWith("calc("))
        return text;
    var m = RX_CSS_UNIT.exec(text);
    if (!m)
        return defaultValue;
    var scalar = parseFloat(m[1]);
    if (isNaN(scalar) || scalar === 0)
        return "0";
    var unit = m[2].length < 1 ? "px" : m[2];
    return "" + scalar + unit;
}
//# sourceMappingURL=unit.js.map