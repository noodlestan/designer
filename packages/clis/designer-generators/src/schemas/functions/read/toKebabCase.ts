export function toKebabCase(str: string): string {
    return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase());
}
