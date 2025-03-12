import { PRIMITIVE_TEXT_STYLE } from '../../../../constants';
import type { TextStyleAttributesLiteral, TextTransformName } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isNonEmptyString } from '../../../../private';
import { TEXT_STYLE_ATTRIBUTES_TRANSFORM } from '../constants';

export function validateTextTransform(
    context: PrimitiveContext<TextStyleAttributesLiteral>,
    maybeTransform: unknown,
): TextTransformName | undefined {
    if (maybeTransform === undefined) {
        return undefined;
    }
    if (isNonEmptyString(maybeTransform)) {
        const trimmedTransform = maybeTransform.trim() as TextTransformName;
        if (TEXT_STYLE_ATTRIBUTES_TRANSFORM.includes(trimmedTransform)) {
            return trimmedTransform;
        }
    }
    handlePrimitiveInputError(
        context,
        PRIMITIVE_TEXT_STYLE,
        maybeTransform,
        'Invalid TextTransformName',
    );
}
