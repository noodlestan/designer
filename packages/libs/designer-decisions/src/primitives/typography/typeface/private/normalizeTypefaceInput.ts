import { P_TYPEFACE } from '../../../../constants';
import type { TypefaceLiteral, TypefaceObjectLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { TYPEFACE_FALLBACK_FONT_NAME } from '../../../../primitives';
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

    handlePrimitiveInputError(context, P_TYPEFACE, input, 'TypefaceObjectLiteral');
    return {
        fontName: TYPEFACE_FALLBACK_FONT_NAME,
    };
}
