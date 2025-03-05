import type {
    LineHeightLiteral,
    LineHeightObjectLiteral,
    SizeAbsoluteUnits,
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
        const valueAndUnit = parseValueAndUnit<SizeAbsoluteUnits>(input);
        if (!valueAndUnit) {
            handlePrimitiveInputError(context, primitiveName, input, 'Invalid LineHeightRaw');
            return { value: fallback, unit: defaultUnit as SizeAbsoluteUnits };
        }
        return validateValueAndUnit(lineHeightDefinition, context, valueAndUnit);
    }

    handlePrimitiveInputError(context, primitiveName, input, 'Invalid LineHeightObjectLiteral');
    return { value: fallback, unit: defaultUnit as SizeAbsoluteUnits };
}
