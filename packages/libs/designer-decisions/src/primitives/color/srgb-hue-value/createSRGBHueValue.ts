import type {
    ColorSRGBHueInput,
    ColorchannelOptions,
    SRGBHueValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
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

    const normalize = (v: number) => clampChannelValue(v, 'srgb-hue');
    const { get, raw, quantized } = createNumericValue(value, { quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l });
        },
    };
};
