import type { ColorSRGBSaturationInput, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';

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
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
