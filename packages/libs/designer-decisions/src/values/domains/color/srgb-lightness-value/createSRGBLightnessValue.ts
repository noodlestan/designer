import type { ColorSRGBLightnessInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import {
    type ColorChannelValueOptions,
    type SRGBLightnessValue,
    COLOR_CHANNEL_SRGB_LIGHTNESS_BASE as base,
    clampChannelValue,
    createBaseValue,
    createNumericValue,
    COLOR_CHANNEL_SRGB_LIGHTNESS_NAME as name,
    COLOR_CHANNEL_SRGB_LIGHTNESS_QUANTIZE as quant,
} from '../../../primitives';
import { createColorValue } from '../color-value';

import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

export const createSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightnessInput,
    options: ColorChannelValueOptions = {},
): SRGBLightnessValue => {
    context.consume(input);

    const { quantize = quant } = options;
    const value = resolveSRGBLightnessValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-lightness');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => name,
        toColor: channels => {
            const { h, s } = channels;
            return createColorValue(context.outputContext(), { h, s, l: value }, { quantize });
        },
    };
};
