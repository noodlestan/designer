import { type ColorSRGBLightnessInput, isDecisionRef } from '../../../../inputs';
import { type ValueContext, createValueInputError } from '../../../../value';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveSRGBLightnessValueRef } from './resolveSRGBLightnessValueRef';

export const resolveSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightnessInput,
): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBLightnessValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
