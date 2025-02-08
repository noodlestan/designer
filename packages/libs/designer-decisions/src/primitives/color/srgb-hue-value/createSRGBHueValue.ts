import type {
    ColorChannelValueOptions,
    ColorSRGBHueInput,
    SRGBHueValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import {
    COLOR_CHANNEL_SRGB_HUE_BASE as base,
    COLOR_CHANNEL_SRGB_HUE_NAME as name,
    COLOR_CHANNEL_SRGB_HUE_QUANTIZE as quant,
} from '../constants';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
    options: ColorChannelValueOptions = {},
): SRGBHueValue => {
    context.consume(input);

    const { quantize = quant } = options;
    const value = resolveSRGBHueValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-hue');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => name,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l }, { quantize });
        },
    };
};
