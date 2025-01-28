import type { ColorOklabChroma, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { clampChannelValue } from '../helpers';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveOklabChromaValueRef } from './resolveOklabChromaValueRef';

export const resolveOklabChromaValue = (context: ValueContext, input: ColorOklabChroma): number => {
    if (isDecisionRef(input)) {
        return resolveOklabChromaValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return clampChannelValue(input, 'oklab-chroma');
};
