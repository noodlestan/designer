import type { ColorValueInput } from '../../../../../inputs';
import type { ValueContext } from '../../../../../value';
import { createBaseValue } from '../../../../base';
import {
    type ColorChannelBaseValue,
    type ColorChannelValueOptions,
    type ColorComplementaryChannels,
    clampChannelValue,
    createNumericValue,
} from '../../../../primitives';
import { createColorValue } from '../../color-value';

import { resolveColorChannelValue } from './resolveColorChannelValue';
import type { ColorChannelDefinition, ColorChannelInput } from './types';

export const createColorChannelValue = <C extends ColorComplementaryChannels>(
    channel: ColorChannelDefinition,
    context: ValueContext,
    input: ColorChannelInput,
    options: ColorChannelValueOptions = {},
): ColorChannelBaseValue<C> => {
    const baseValue = createBaseValue(context, input);

    const { base, channelName, quant } = channel;
    const { quantize = quant } = options;
    const value = resolveColorChannelValue(channel, context, input);

    const normalize = (v: number) => clampChannelValue(v, channel.channelName);
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    const toColor = (channels: C) => {
        const literal = { ...channels, [channel.channelKey]: value } as ColorValueInput;
        return createColorValue(context.outputContext(), literal, { quantize });
    };

    return {
        ...baseValue,
        get,
        raw,
        quantized,
        name: () => channelName,
        toColor,
    } as ColorChannelBaseValue<C>;
};
