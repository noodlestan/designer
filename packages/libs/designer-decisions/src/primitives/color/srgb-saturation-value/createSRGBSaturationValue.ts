import type { ColorSRGBSaturationInput } from '../../../inputs';
import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import type { ColorChannelValueOptions, SRGBSaturationValue } from '../../types';
import {
    COLOR_CHANNEL_SRGB_SATURATION_BASE as base,
    COLOR_CHANNEL_SRGB_SATURATION_NAME as name,
    COLOR_CHANNEL_SRGB_SATURATION_QUANTIZE as quant,
} from '../constants';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
    options: ColorChannelValueOptions = {},
): SRGBSaturationValue => {
    context.consume(input);

    const { quantize = quant } = options;
    const value = resolveSRGBSaturationValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-saturation');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => name,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, s: value, l }, { quantize });
        },
    };
};
