import { type ColorSRGBHueInput, isDecisionRef } from '../../../../inputs';
import { type ValueContext, createValueInputError } from '../../../../value';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveSRGBHueValueRef } from './resolveSRGBHueValueRef';

export const resolveSRGBHueValue = (context: ValueContext, input: ColorSRGBHueInput): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBHueValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
