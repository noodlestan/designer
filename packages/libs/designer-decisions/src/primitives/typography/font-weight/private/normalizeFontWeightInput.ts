import { P_FONT_WEIGHT } from '../../../../constants';
import type { FontWeightLiteral, FontWeightObjectLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isObject } from '../../../../private';
import { FONT_WEIGHT_FALLBACK_LITERAL as fallback } from '../constants';

import { fontWeightFromName } from './fontWeightFromName';
import { fontWeightToOpenTypeName } from './fontWeightToOpenTypeName';
import { isValidFontWeightName } from './isValidFontWeightName';

export function normalizeFontWeightInput(
    context: PrimitiveContext<FontWeightLiteral>,
): FontWeightObjectLiteral {
    const input = context.input();

    const object = {
        value: typeof input === 'number' ? input : undefined,
        name: typeof input === 'string' ? input : undefined,
    };
    const { name: maybeName, value: maybeValue } = isObject(input) ? input : object;

    if (typeof maybeValue === 'number' && isNaN(maybeValue)) {
        handlePrimitiveInputError(context, P_FONT_WEIGHT, input, 'Invalid FontWeightRaw');
        return fallback;
    }

    if (typeof maybeName === 'string' && !isValidFontWeightName(maybeName)) {
        handlePrimitiveInputError(context, P_FONT_WEIGHT, input, 'Invalid FontWeightNamed');
        return fallback;
    }

    if (
        typeof maybeValue === 'number' &&
        typeof maybeName === 'string' &&
        fontWeightFromName(maybeName) !== maybeValue
    ) {
        handlePrimitiveInputError(context, P_FONT_WEIGHT, input, 'Value mismatch');
        return fallback;
    }

    if (typeof input === 'number') {
        return { value: input, name: fontWeightToOpenTypeName(input) };
    }
    if (typeof input === 'string') {
        return { value: fontWeightFromName(input) as number, name: input };
    }
    if (typeof input === 'object') {
        return input as FontWeightObjectLiteral;
    }

    handlePrimitiveInputError(context, P_FONT_WEIGHT, input, 'Invalid FontWeightLiteral');
    return fallback;
}
