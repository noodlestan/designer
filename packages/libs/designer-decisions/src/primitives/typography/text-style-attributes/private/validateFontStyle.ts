import { PRIMITIVE_TEXT_STYLE } from '../../../../constants';
import type { FontStyleName, TextStyleAttributesLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isNonEmptyString } from '../../../../private';
import { TEXT_STYLE_ATTRIBUTES_STYLE } from '../constants';

export function validateFontStyle(
    context: PrimitiveContext<TextStyleAttributesLiteral>,
    maybeFontStyle: unknown,
): FontStyleName | undefined {
    if (maybeFontStyle === undefined) {
        return undefined;
    }
    if (isNonEmptyString(maybeFontStyle)) {
        const trimmedStyle = maybeFontStyle.trim() as FontStyleName;
        if (TEXT_STYLE_ATTRIBUTES_STYLE.includes(trimmedStyle)) {
            return trimmedStyle;
        }
    }
    handlePrimitiveInputError(
        context,
        PRIMITIVE_TEXT_STYLE,
        maybeFontStyle,
        'Invalid FontStyleName',
    );
}
