import { type SizeObjectLiteral, type SizeValueInput, isDecisionRef } from '../../../../inputs';
import { type ValueContext, createValueInputError } from '../../../../value';
import { isValidSizeObjectLiteral } from '../../../primitives/size/helpers';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveSizeValueRef } from './resolveSizeValueRef';

export const resolveSizeValue = (
    context: ValueContext,
    input: SizeValueInput,
): SizeObjectLiteral => {
    if (isDecisionRef(input)) {
        return resolveSizeValueRef(context, input);
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
