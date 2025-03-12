import { P_TYPEFACE } from '../../../../constants';
import type { TypefaceLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isNonEmptyString } from '../../../../private';
import { TYPEFACE_FALLBACK_FONT_NAME } from '../constants';

export function validateFontName(
    context: PrimitiveContext<TypefaceLiteral>,
    maybeFontName: unknown,
): string {
    if (isNonEmptyString(maybeFontName)) {
        return maybeFontName.trim();
    }
    handlePrimitiveInputError(context, P_TYPEFACE, maybeFontName, 'Invalid fontName');
    return TYPEFACE_FALLBACK_FONT_NAME;
}
