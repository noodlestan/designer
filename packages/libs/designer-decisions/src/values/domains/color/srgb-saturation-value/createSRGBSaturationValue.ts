import type { ColorSRGBSaturationInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import {
    type ColorChannelValueOptions,
    type SRGBSaturationValue,
    COLOR_CHANNEL_SRGB_SATURATION_BASE as base,
    clampChannelValue,
    createNumericValue,
    COLOR_CHANNEL_SRGB_SATURATION_NAME as name,
    COLOR_CHANNEL_SRGB_SATURATION_QUANTIZE as quant,
} from '../../../primitives';
import { createColorValue } from '../color-value';

import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
    options: ColorChannelValueOptions = {},
): SRGBSaturationValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = quant } = options;
    const value = resolveSRGBSaturationValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'srgb-saturation');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...baseValue,
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
