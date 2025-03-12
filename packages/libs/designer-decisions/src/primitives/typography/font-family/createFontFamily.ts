import type { FontFamilyLiteral, FontFamilyName } from '../../../inputs';
import { type PrimitiveContext } from '../../../primitive';

import { normalizeFontFamilyInput, stringifyFontFamily, validateFontFamilyName } from './private';
import type { FontFamily } from './types';

export function createFontFamily(context: PrimitiveContext<FontFamilyLiteral>): FontFamily {
    const maybeFontFamilies = normalizeFontFamilyInput(context);

    const families = maybeFontFamilies
        .map(familyName => validateFontFamilyName(context, familyName))
        .filter(Boolean) as FontFamilyName[];

    const literal = () => ({ families, fontName: families[0] });

    return {
        ...literal(),
        literal,
        toString: () => stringifyFontFamily(literal().families),
    };
}
