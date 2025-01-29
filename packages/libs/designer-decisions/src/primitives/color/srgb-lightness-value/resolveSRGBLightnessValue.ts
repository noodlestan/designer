import type { ColorSRGBLightness, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { clampChannelValue } from '../helpers';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveSRGBLightnessValueRef } from './resolveSRGBLightnessValueRef';

export const resolveSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightness,
): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBLightnessValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createInvalidInputError({ context, valueName, input }));
        return fallback;
    }

    return clampChannelValue(input, 'srgb-lightness');
};
