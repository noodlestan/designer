import { P_FONT_FAMILY } from '../../../../constants';
import type { FontFamilyArrayLiteral, FontFamilyLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { FONT_FAMILY_FALLBACK_LITERAL } from '../../../../primitives';

export function normalizeFontFamilyInput(
    context: PrimitiveContext<FontFamilyLiteral>,
): FontFamilyArrayLiteral {
    const input = context.input();

    if (typeof input === 'string') {
        return input.split(',');
    }

    if (Array.isArray(input)) {
        return input as FontFamilyArrayLiteral;
    }

    handlePrimitiveInputError(context, P_FONT_FAMILY, input, 'FontFamilyLiteral');
    return FONT_FAMILY_FALLBACK_LITERAL;
}
