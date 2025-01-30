import type { ColorSRGBHueInput, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { clampChannelValue } from '../helpers';

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

    return clampChannelValue(input, 'srgb-hue');
};
