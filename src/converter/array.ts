// tslint:disable:no-any

export default function castArray<T>(v: any, defaultValue: T[] = []): T[] {
    if (typeof v === 'undefined') {
        return defaultValue
    }
    if (Array.isArray(v)) {
        return v
    }
    return [v as T]
}
