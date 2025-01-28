import type { ColorOklabHue, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { clampChannelValue } from '../helpers';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveOklabHueValueRef } from './resolveOklabHueValueRef';

export const resolveOklabHueValue = (context: ValueContext, input: ColorOklabHue): number => {
    if (isDecisionRef(input)) {
        return resolveOklabHueValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return clampChannelValue(input, 'oklab-hue');
};
