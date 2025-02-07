import type {
    ColorSRGBLightnessInput,
    ColorchannelOptions,
    SRGBLightnessValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
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

    const normalize = (v: number) => clampChannelValue(v, 'srgb-lightness');
    const { get, raw, quantized } = createNumericValue(value, { quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, s } = channels;
            return createColorValue(context.outputContext(), { h, s, l: value });
        },
    };
};
