import type {
    ColorOklabLightnessInput,
    ColorchannelOptions,
    OklabLightnessValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

export const createOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
    options: ColorchannelOptions = {},
): OklabLightnessValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveOklabLightnessValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-lightness');
    const { get, raw, quantized } = createNumericValue(value, { quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { c, h } = channels;
            return createColorValue(context.outputContext(), { l: value, c, h });
        },
    };
};
