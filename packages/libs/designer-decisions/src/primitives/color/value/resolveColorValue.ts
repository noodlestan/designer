import type { Color } from 'chroma-js';
import chroma from 'chroma-js';

import type { ColorInputValue, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { resolveSRGBHueValue } from '../srgb-hue-value';
import { resolveSRGBLightnessValue } from '../srgb-lightness-value';
import { resolveSRGBSaturationValue } from '../srgb-saturation-value';

import { FALLBACK_VALUE, VALUE_NAME } from './private';
import { resolveColorValueRef } from './resolveColorValueRef';

export const resolveColorValue = (context: ValueContext, input: ColorInputValue): Color => {
    if (isDecisionRef(input)) {
        return resolveColorValueRef(context, input);
    } else if (typeof input === 'object') {
        if ('s' in input) {
            return chroma.hsl(
                resolveSRGBHueValue(context, input.h),
                resolveSRGBSaturationValue(context, input.s),
                resolveSRGBLightnessValue(context, input.l),
            );
            // } else if ('a' in input) {
            //     return chroma.oklab(
            //         resolveSRGBHueValue(context, input.l),
            //         resolveSRGBSaturationValue(context, input.a),
            //         resolveSRGBLightnessValue(context, input.b),
            //     );
        }
    } else if (typeof input === 'string' || typeof input === 'number') {
        try {
            const value = chroma(input);
            return value;
        } catch (error) {
            context.addError(createInvalidInputError({ context, name: VALUE_NAME, input, error }));
            return FALLBACK_VALUE;
        }
    }

    context.addError(createInvalidInputError({ context, name: VALUE_NAME, input }));
    return FALLBACK_VALUE;
};
