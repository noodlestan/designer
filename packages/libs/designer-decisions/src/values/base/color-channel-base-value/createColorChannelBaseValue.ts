import type { ColorValueInput } from '../../../inputs';
import type { ValueContext } from '../../../value';
import { createColorValue } from '../../domains';
import {
    type ColorComplementaryChannels,
    clampChannelValue,
    createNumericValue,
} from '../../primitives';
import { createBaseValue } from '../base-value';

import { resolveColorChannelBaseValue } from './resolveColorChannelBaseValue';
import type {
    ColorChannelBaseOptions,
    ColorChannelBaseValue,
    ColorChannelDefinition,
    ColorChannelInput,
} from './types';

export const createColorChannelBaseValue = <C extends ColorComplementaryChannels>(
    channelDefinition: ColorChannelDefinition,
    context: ValueContext,
    input: ColorChannelInput,
    options: ColorChannelBaseOptions = {},
): ColorChannelBaseValue<C> => {
    const baseValue = createBaseValue(context, input);

    const { base, channelName, quant } = channelDefinition;
    const { quantize = quant } = options;
    const value = resolveColorChannelBaseValue(channelDefinition, context, input);

    const normalize = (v: number) => clampChannelValue(v, channelDefinition.channelName);
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    const toColor = (channels: C) => {
        const literal = { ...channels, [channelDefinition.channelKey]: value } as ColorValueInput;
        return createColorValue(context.outputContext(), literal, { quantize });
    };

    return {
        ...baseValue,
        get,
        raw,
        quantized,
        channelName: () => channelName,
        toColor,
    } as ColorChannelBaseValue<C>;
};
