export function isObject(maybeObject: unknown): maybeObject is NonNullable<object> {
    return typeof maybeObject === 'object' && maybeObject !== null;
}
