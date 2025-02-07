import type {
    ColorOklabLightnessInput,
    ColorchannelOptions,
    OklabLightnessValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { quantized } from '../../number';
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

    const normalised = () => clampChannelValue(quantized(value, quantize), 'oklab-lightness');

    return {
        ...createBaseValue(context),
        get: normalised,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { c, h } = channels;
            return createColorValue(context.outputContext(), { l: value, c, h });
        },
    };
};
