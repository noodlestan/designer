export function isNonEmptyString(maybeString: string | undefined): maybeString is string {
    return (
        typeof maybeString === 'string' &&
        maybeString.trim() !== '' &&
        maybeString.trim() === maybeString
    );
}
