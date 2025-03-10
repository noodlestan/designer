import type { FontFamilyName } from '../../../../inputs';

function maybeQuote(family: string): string {
    if (/[\s\d\W]/.test(family) && !/^[-\w]+$/.test(family)) {
        return `"${family}"`;
    }
    return family;
}

export function stringifyFontFamily(families: FontFamilyName[]): string {
    return families.map(maybeQuote).join(', ');
}
