import type { ColorSRGBHueInput } from '../../../inputs';
import { type ValueContext, createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveSRGBHueValueRef } from './resolveSRGBHueValueRef';

export const resolveSRGBHueValue = (context: ValueContext, input: ColorSRGBHueInput): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBHueValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
