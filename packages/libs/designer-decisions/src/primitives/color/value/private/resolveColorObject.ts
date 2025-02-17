import type { ColorObjectInput } from '../../../../inputs';
import { type ValueContext, createInvalidInputError } from '../../../../values';
import type { Color } from '../../../types';
import { createColor } from '../../helpers';
import { resolveOklabChromaValue } from '../../oklab-chroma-value';
import { resolveOklabHueValue } from '../../oklab-hue-value';
import { resolveOklabLightnessValue } from '../../oklab-lightness-value';
import { resolveSRGBHueValue } from '../../srgb-hue-value';
import { resolveSRGBLightnessValue } from '../../srgb-lightness-value';
import { resolveSRGBSaturationValue } from '../../srgb-saturation-value';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './constants';

export function resolveColorObject(input: ColorObjectInput, context: ValueContext): Color {
    if ('s' in input) {
        return createColor({
            h: resolveSRGBHueValue(context, input.h),
            s: resolveSRGBSaturationValue(context, input.s),
            l: resolveSRGBLightnessValue(context, input.l),
        });
    } else if ('a' in input) {
        return createColor({
            l: resolveOklabLightnessValue(context, input.l),
            a: input.a,
            b: input.b,
        });
    } else if ('c' in input) {
        return createColor({
            l: resolveOklabLightnessValue(context, input.l),
            c: resolveOklabChromaValue(context, input.c),
            h: resolveOklabHueValue(context, input.h),
        });
    }
    context.addError(createInvalidInputError({ context, valueName, input }));
    return fallback;
}
