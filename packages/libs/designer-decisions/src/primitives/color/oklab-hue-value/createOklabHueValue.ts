import type {
    ColorOklabHueInput,
    ColorchannelOptions,
    OklabHueValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabHueValue } from './resolveOklabHueValue';

export const createOklabHueValue = (
    context: ValueContext,
    input: ColorOklabHueInput,
    options: ColorchannelOptions = {},
): OklabHueValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveOklabHueValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-hue');
    const { get, raw, quantized } = createNumericValue(value, { quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { l, c } = channels;
            return createColorValue(context.outputContext(), { l, c, h: value });
        },
    };
};
