import type { ColorOklabLightnessInput } from '../../../inputs';
import { type ValueContext, createValueInputError } from '../../../values';
import { isDecisionRef } from '../../ref';

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
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
