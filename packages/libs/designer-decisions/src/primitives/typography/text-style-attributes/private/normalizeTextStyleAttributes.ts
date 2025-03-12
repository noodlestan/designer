import { P_TEXT_STYLE } from '../../../../constants';
import type { TextStyleAttributesLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { type DeepPartial, isObject } from '../../../../private';

export function normalizeTextStyleAttributes(
    context: PrimitiveContext<TextStyleAttributesLiteral>,
): DeepPartial<TextStyleAttributesLiteral> {
    const input = context.input();

    if (isObject(input)) {
        return { ...input };
    }

    handlePrimitiveInputError(context, P_TEXT_STYLE, input, 'TextStyleAttributesLiteral');
    return {};
}
