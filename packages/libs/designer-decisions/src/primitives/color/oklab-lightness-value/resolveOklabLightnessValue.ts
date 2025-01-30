import type { ColorOklabLightnessInput, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { clampChannelValue } from '../helpers';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveOklabLightnessValueRef } from './resolveOklabLightnessValueRef';

export const resolveOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
): number => {
    if (isDecisionRef(input)) {
        return resolveOklabLightnessValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return clampChannelValue(input, 'oklab-lightness');
};
