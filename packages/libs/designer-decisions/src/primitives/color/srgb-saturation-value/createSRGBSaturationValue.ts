import type {
    ColorSRGBSaturationInput,
    ColorchannelOptions,
    SRGBSaturationValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
    options: ColorchannelOptions = {},
): SRGBSaturationValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveSRGBSaturationValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-saturation');
    const { get, raw, quantized } = createNumericValue(value, { quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, s: value, l });
        },
    };
};
