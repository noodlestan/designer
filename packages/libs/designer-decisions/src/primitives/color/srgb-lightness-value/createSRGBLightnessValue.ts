import type {
    ColorSRGBLightnessInput,
    ColorchannelOptions,
    SRGBLightnessValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { quantized } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

export const createSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightnessInput,
    options: ColorchannelOptions = {},
): SRGBLightnessValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveSRGBLightnessValue(context, input);

    const normalised = () => clampChannelValue(quantized(value, quantize), 'srgb-lightness');

    return {
        ...createBaseValue(context),
        get: normalised,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, s } = channels;
            return createColorValue(context.outputContext(), { h, s, l: value });
        },
    };
};
