import type {
    ColorChannelValueOptions,
    ColorSRGBHueInput,
    SRGBHueValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME, NUMERIC_VALUE_BASE as base } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
    options: ColorChannelValueOptions = {},
): SRGBHueValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveSRGBHueValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-hue');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l }, { quantize });
        },
    };
};
