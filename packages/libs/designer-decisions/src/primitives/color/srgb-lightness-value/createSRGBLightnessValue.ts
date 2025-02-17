import type { ColorSRGBLightnessInput } from '../../../inputs';
import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import type { ColorChannelValueOptions, SRGBLightnessValue } from '../../types';
import {
    COLOR_CHANNEL_SRGB_LIGHTNESS_BASE as base,
    COLOR_CHANNEL_SRGB_LIGHTNESS_NAME as name,
    COLOR_CHANNEL_SRGB_LIGHTNESS_QUANTIZE as quant,
} from '../constants';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

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
