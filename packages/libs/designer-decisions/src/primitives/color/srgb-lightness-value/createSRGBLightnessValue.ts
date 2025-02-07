import type {
    ColorChannelValueOptions,
    ColorSRGBLightnessInput,
    SRGBLightnessValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME, NUMERIC_VALUE_BASE as base } from './private';
import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

export const createSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightnessInput,
    options: ColorChannelValueOptions = {},
): SRGBLightnessValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveSRGBLightnessValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-lightness');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, s } = channels;
            return createColorValue(context.outputContext(), { h, s, l: value }, { quantize });
        },
    };
};
