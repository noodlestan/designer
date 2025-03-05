export function isNonEmptyString(maybeString: unknown | undefined): maybeString is string {
    return typeof maybeString === 'string' && maybeString.trim() !== '';
}
