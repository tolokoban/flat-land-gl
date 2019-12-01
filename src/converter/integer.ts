// tslint:disable:no-any
// tslint:disable:ban

const NUMBER_PREFIX_LENGTH = 2
const HALF = 0.5

export default function castInteger(v: any, defaultValue = 0): number {
    const defVal = Math.floor(HALF + defaultValue)

    switch (typeof v) {
        case 'boolean':
            return v ? 1 : 0
        case 'number':
            return Math.floor(HALF + v)
        case 'string':
            const text = v.trim().toLowerCase()
            if (text.startsWith('0x')) {
                const hexa = parseInt(text.substr(NUMBER_PREFIX_LENGTH), 16)
                return isNaN(hexa) ? defVal : hexa
            }
            if (text.startsWith('0b')) {
                const hexa = parseInt(text.substr(NUMBER_PREFIX_LENGTH), 2)
                return isNaN(hexa) ? defVal : hexa
            }
            if (text.startsWith('0o')) {
                const hexa = parseInt(text.substr(NUMBER_PREFIX_LENGTH), 8)
                return isNaN(hexa) ? defVal : hexa
            }
            const num = Number(text)
            if (isNaN(num)) {
                return defVal
            }
            return Math.floor(HALF + num)
        default:
            return defVal
    }
}
