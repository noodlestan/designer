import type { TypefaceLiteral } from '../../../inputs';
import { type PrimitiveContext } from '../../../primitive';

import { normalizeTypefaceInput, validateCapabilities, validateFontName } from './private';
import type { Typeface } from './types';

export function createTypeface(context: PrimitiveContext<TypefaceLiteral>): Typeface {
    const {
        fontName: rawFontName,
        source,
        capabilities: rawCapabilities = [],
        ranges = [],
        styles = [],
    } = normalizeTypefaceInput(context);

    const fontName = validateFontName(context, rawFontName);
    const capabilities = validateCapabilities(context, rawCapabilities);

    const literal = () => {
        return {
            fontName,
            source,
            capabilities,
            ranges,
            styles,
        };
    };

    return {
        ...literal(),
        literal,
        toString: () => literal().fontName,
    };
}
