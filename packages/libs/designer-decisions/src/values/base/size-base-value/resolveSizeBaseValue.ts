import { type SizeObjectLiteral, type SizeValueInput, isDecisionRef } from '../../../inputs';
import { type ValueContext, createValueInputError } from '../../../value';
import { isValidSizeObjectLiteral } from '../../primitives';

import { resolveSizeBaseValueRef } from './resolveSizeBaseValueRef';
import type { SizeDefinition } from './types';

export const resolveSizeBaseValue = (
    sizeDefinition: SizeDefinition,
    context: ValueContext,
    input: SizeValueInput,
): SizeObjectLiteral => {
    const { fallback, valueName } = sizeDefinition;

    if (isDecisionRef(input)) {
        return resolveSizeBaseValueRef(sizeDefinition, context, input);
    }

    if (typeof input === 'string') {
        const value = Number(input);
        if (isNaN(value)) {
            context.addError(createValueInputError({ context, valueName, input }));
            return fallback;
        }
        return { value, units: 'px' };
    }

    if (typeof input === 'number') {
        return { value: input, units: 'px' };
    }

    if (!isValidSizeObjectLiteral(input)) {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
