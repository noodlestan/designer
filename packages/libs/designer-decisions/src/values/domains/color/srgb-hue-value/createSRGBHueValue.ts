import type { ColorSRGBHueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import {
    type ColorChannelValueOptions,
    type SRGBHueValue,
    COLOR_CHANNEL_SRGB_HUE_BASE as base,
    clampChannelValue,
    COLOR_CHANNEL_SRGB_HUE_NAME as name,
    COLOR_CHANNEL_SRGB_HUE_QUANTIZE as quant,
} from '../../../primitives';
import { createNumericValue } from '../../../primitives';
import { createColorValue } from '../color-value';

import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
    options: ColorChannelValueOptions = {},
): SRGBHueValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = quant } = options;
    const value = resolveSRGBHueValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-hue');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...baseValue,
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
