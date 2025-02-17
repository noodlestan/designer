import type { SpaceValueInput, SpaceWithUnits } from '../../../inputs';
import { type ValueContext, createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { isValidSpaceWithUnits } from '../helpers';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveSpaceValueRef } from './resolveSpaceValueRef';

export const resolveSpaceValue = (
    context: ValueContext,
    input: SpaceValueInput,
): SpaceWithUnits => {
    if (isDecisionRef(input)) {
        return resolveSpaceValueRef(context, input);
    }

    if (typeof input === 'string') {
        const value = Number(input);
        if (isNaN(value)) {
            context.addError(createInvalidInputError({ context, valueName, input }));
            return fallback;
        }
        return { value, units: 'px' };
    }

    if (typeof input === 'number') {
        return { value: input, units: 'px' };
    }

    if (!isValidSpaceWithUnits(input)) {
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
