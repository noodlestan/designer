import { type PrimitiveContext, handlePrimitiveInputError } from '../../../primitive';
import type { DeepPartial } from '../../../private';
import type { AbstractValueAndUnit, ValueAndUnitDefinition } from '../types';

import { isValidUnit } from './isValidUnit';

export function validateValueAndUnit<T extends AbstractValueAndUnit = AbstractValueAndUnit>(
    sizeDefinition: ValueAndUnitDefinition,
    context: PrimitiveContext,
    input: DeepPartial<T>,
): T {
    const { primitiveName, validUnits, defaultUnit, fallback } = sizeDefinition;

    const { value: maybeValue, unit: maybeUnit } = input;

    if (typeof maybeValue !== 'number') {
        handlePrimitiveInputError(context, primitiveName, input, 'Invalid SizeObjectLiteral');
    }

    if (maybeUnit && (typeof maybeUnit !== 'string' || !isValidUnit(maybeUnit, validUnits))) {
        handlePrimitiveInputError(context, primitiveName, input, 'Invalid SizeAbsoluteUnits');
    }

    return {
        value: maybeValue || fallback,
        unit: maybeUnit || defaultUnit,
    } as T;
}
