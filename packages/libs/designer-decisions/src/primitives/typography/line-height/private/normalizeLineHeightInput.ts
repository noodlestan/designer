import type {
    LineHeightLiteral,
    LineHeightObjectLiteral,
    LineHeightUnits,
} from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isObject } from '../../../../private';
import { parseValueAndUnit, validateValueAndUnit } from '../../../units';

import { LINE_HEIGHT_VALUE_AND_UNIT_DEFINITION as lineHeightDefinition } from './constants';

export function normalizeLineHeightInput(
    context: PrimitiveContext<LineHeightLiteral>,
): LineHeightObjectLiteral {
    const input = context.input();

    const { primitiveName, defaultUnit, fallback } = lineHeightDefinition;

    if (isObject(input)) {
        return validateValueAndUnit(lineHeightDefinition, context, input);
    }

    if (typeof input === 'string') {
        const valueAndUnit = parseValueAndUnit<LineHeightUnits>(input);
        if (!valueAndUnit) {
            handlePrimitiveInputError(context, primitiveName, input, 'Invalid LineHeightRaw');
            return { value: fallback, unit: defaultUnit as LineHeightUnits };
        }
        return validateValueAndUnit(lineHeightDefinition, context, valueAndUnit);
    }

    if (typeof input === 'number') {
        if (isNaN(input)) {
            handlePrimitiveInputError(context, primitiveName, input, 'Invalid LineHeightRaw');
            return { value: fallback, unit: defaultUnit as LineHeightUnits };
        }
        return { value: input, unit: defaultUnit as LineHeightUnits };
    }

    handlePrimitiveInputError(context, primitiveName, input, 'Invalid LineHeightObjectLiteral');
    return { value: fallback, unit: defaultUnit as LineHeightUnits };
}
