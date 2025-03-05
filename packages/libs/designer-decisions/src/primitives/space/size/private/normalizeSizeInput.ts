import type { SizeAbsoluteUnits, SizeLiteral, SizeObjectLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isObject } from '../../../../private';
import { parseValueAndUnit, validateValueAndUnit } from '../../../units';
import type { SizeDefinition } from '../types';

export function normalizeSizeInput(
    sizeDefinition: SizeDefinition,
    context: PrimitiveContext<SizeLiteral>,
): SizeObjectLiteral {
    const input = context.input();

    const { primitiveName, defaultUnit, fallback } = sizeDefinition;

    if (isObject(input)) {
        return validateValueAndUnit(sizeDefinition, context, input);
    }

    if (typeof input === 'string') {
        const valueAndUnit = parseValueAndUnit<SizeAbsoluteUnits>(input);
        if (!valueAndUnit) {
            handlePrimitiveInputError(context, primitiveName, input, 'Invalid SizeRaw');
            return { value: fallback, unit: defaultUnit as SizeAbsoluteUnits };
        }
        return validateValueAndUnit(sizeDefinition, context, valueAndUnit);
    }

    if (typeof input === 'number' && !isNaN(input)) {
        return { value: input };
    }

    handlePrimitiveInputError(context, primitiveName, input, 'Invalid SizeLiteral');
    return { value: fallback, unit: defaultUnit as SizeAbsoluteUnits };
}
