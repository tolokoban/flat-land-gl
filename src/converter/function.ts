// tslint:disable:no-any

const EMPTY_FUNCTION = () => {
    /* The empty function, obviously, is empty. */
}

type TFunction = () => void

export default function castFunction(
    value: any,
    defaultValue: TFunction = EMPTY_FUNCTION
): TFunction {
    if (typeof value === 'function') {
        return value as TFunction
    }
    return defaultValue
}
