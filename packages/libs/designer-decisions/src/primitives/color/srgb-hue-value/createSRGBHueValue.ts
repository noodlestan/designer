import type {
    ColorSRGBHueInput,
    ColorchannelOptions,
    SRGBHueValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { quantized } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
    options: ColorchannelOptions = {},
): SRGBHueValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveSRGBHueValue(context, input);

    const normalised = () => clampChannelValue(quantized(value, quantize), 'srgb-hue');

    return {
        ...createBaseValue(context),
        get: normalised,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l });
        },
    };
};
