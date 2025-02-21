import { type ColorSRGBSaturationInput, isDecisionRef } from '../../../../inputs';
import { type ValueContext, createValueInputError } from '../../../../value';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveSRGBSaturationValueRef } from './resolveSRGBSaturationValueRef';

export const resolveSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBSaturationValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
