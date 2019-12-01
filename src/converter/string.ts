// tslint:disable:no-any
// tslint:disable:no-unsafe-any

export default function castString(value: any, defaultValue = ''): string {
    const t = typeof value
    if (t === 'number' && !isNaN(value)) {
        return `${value}`
    }
    if (t === 'string') {
        return value as string
    }
    return defaultValue
}
