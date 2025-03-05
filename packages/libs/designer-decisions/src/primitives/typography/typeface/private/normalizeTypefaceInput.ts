import { PRIMITIVE_TYPEFACE } from '../../../../constants';
import type { TypefaceLiteral, TypefaceObjectLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { FALLBACK_FONT_NAME } from '../../../../primitives';
import { type DeepPartial, isObject } from '../../../../private';

export function normalizeTypefaceInput(
    context: PrimitiveContext<TypefaceLiteral>,
): DeepPartial<TypefaceObjectLiteral> {
    const input = context.input();

    if (isObject(input)) {
        return { ...input };
    }
    if (typeof input === 'string') {
        return { fontName: input };
    }

    handlePrimitiveInputError(context, PRIMITIVE_TYPEFACE, input, 'TypefaceObjectLiteral');
    return {
        fontName: FALLBACK_FONT_NAME,
    };
}
