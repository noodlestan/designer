import type { ColorOklabHueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { ColorChannelValueOptions, OklabHueValue } from '../../../primitives';
import {
    COLOR_CHANNEL_OKLAB_HUE_BASE as base,
    clampChannelValue,
    createNumericValue,
    COLOR_CHANNEL_OKLAB_HUE_NAME as name,
    COLOR_CHANNEL_OKLAB_HUE_QUANTIZE as quant,
} from '../../../primitives';
import { createColorValue } from '../color-value';

import { resolveOklabHueValue } from './resolveOklabHueValue';

export const createOklabHueValue = (
    context: ValueContext,
    input: ColorOklabHueInput,
    options: ColorChannelValueOptions = {},
): OklabHueValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = quant } = options;
    const value = resolveOklabHueValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-hue');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...baseValue,
        get,
        raw,
        quantized,
        name: () => name,
        toColor: channels => {
            const { l, c } = channels;
            return createColorValue(context.outputContext(), { l, c, h: value }, { quantize });
        },
    };
};
