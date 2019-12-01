// tslint:disable:no-any

const RX_CSS_UNIT = /^(-?[.0-9]+)[ \n\r]*([a-z%]*)/
const SCALAR_INDEX = 1
const UNIT_INDEX = 2

export default function castUnit(v: any, defaultValue = '100%') {
    if (typeof v === 'number') {
        return `${v}px`
    }
    if (typeof v !== 'string') {
        return defaultValue
    }
    const text = `${v}`.trim().toLowerCase()
    if (text === 'auto' || text === 'inherit') {
        return text
    }
    if (text.startsWith('calc(')) {
        return text
    }
    const m = RX_CSS_UNIT.exec(text)
    if (!m) {
        return defaultValue
    }
    const scalar = Number(m[SCALAR_INDEX])
    if (isNaN(scalar) || scalar === 0) {
        return '0'
    }
    const unit = m[UNIT_INDEX].length < 1 ? 'px' : m[UNIT_INDEX]
    return `${scalar}${unit}`
}
