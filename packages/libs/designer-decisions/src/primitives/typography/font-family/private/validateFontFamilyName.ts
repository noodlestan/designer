import { PRIMITIVE_FONT_FAMILY } from '../../../../constants';
import type { FontFamilyLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isNonEmptyString } from '../../../../private';

function unoquote(text: string): string {
    return text.replace(/['"]/g, '').trim();
}

export function validateFontFamilyName(
    context: PrimitiveContext<FontFamilyLiteral>,
    maybeFontFamilyName: unknown,
): string | undefined {
    if (isNonEmptyString(maybeFontFamilyName)) {
        const unoquoted = unoquote(maybeFontFamilyName.trim());
        if (isNonEmptyString(unoquoted)) {
            return unoquoted;
        }
    }
    handlePrimitiveInputError(
        context,
        PRIMITIVE_FONT_FAMILY,
        maybeFontFamilyName,
        'invalid FontFamilyName',
    );
}
