import type { ColorOklabHueInput } from '../../../inputs';
import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import type { ColorChannelValueOptions, OklabHueValue } from '../../types';
import {
    COLOR_CHANNEL_OKLAB_HUE_BASE as base,
    COLOR_CHANNEL_OKLAB_HUE_NAME as name,
    COLOR_CHANNEL_OKLAB_HUE_QUANTIZE as quant,
} from '../constants';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { resolveOklabHueValue } from './resolveOklabHueValue';

export const createOklabHueValue = (
    context: ValueContext,
    input: ColorOklabHueInput,
    options: ColorChannelValueOptions = {},
): OklabHueValue => {
    context.consume(input);

    const { quantize = quant } = options;
    const value = resolveOklabHueValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-hue');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
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
