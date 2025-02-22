import { type ColorOklabChromaInput, isDecisionRef } from '../../../../../inputs';
import { type ValueContext, createValueInputError } from '../../../../../value';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveColorChannelValueRef } from './resolveColorChannelValueRef';

export const resolveColorChannelValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
): number => {
    if (isDecisionRef(input)) {
        return resolveColorChannelValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
