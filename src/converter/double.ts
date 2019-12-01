// tslint:disable:no-any
// tslint:disable:ban

const NUMBER_PREFIX_LENGTH = 2

export default function castDouble(v: any, defVal = 0): number {
    switch (typeof v) {
        case 'boolean':
            return v ? 1 : 0
        case 'number':
            return v
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
            return num
        default:
            return defVal
    }
}
