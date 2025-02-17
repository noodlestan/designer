import type { ColorOklabChromaInput } from '../../../inputs';
import { type ValueContext, createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveOklabChromaValueRef } from './resolveOklabChromaValueRef';

export const resolveOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
): number => {
    if (isDecisionRef(input)) {
        return resolveOklabChromaValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
