import type { ColorOklabLightnessInput } from '../../../inputs';
import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import type { ColorChannelValueOptions, OklabLightnessValue } from '../../types';
import {
    COLOR_CHANNEL_OKLAB_LIGHTNESS_BASE as base,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_NAME as name,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_QUANTIZE as quant,
} from '../constants';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

export const createOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
    options: ColorChannelValueOptions = {},
): OklabLightnessValue => {
    context.consume(input);

    const { quantize = quant } = options;
    const value = resolveOklabLightnessValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-lightness');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => name,
        toColor: channels => {
            const { c, h } = channels;
            return createColorValue(context.outputContext(), { l: value, c, h }, { quantize });
        },
    };
};
