import type { ColorOklabLightnessInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import {
    type ColorChannelValueOptions,
    type OklabLightnessValue,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_BASE as base,
    clampChannelValue,
    createNumericValue,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_NAME as name,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_QUANTIZE as quant,
} from '../../../primitives';
import { createColorValue } from '../color-value';

import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

export const createOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
    options: ColorChannelValueOptions = {},
): OklabLightnessValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = quant } = options;
    const value = resolveOklabLightnessValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-lightness');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...baseValue,
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
