import type { ColorChannelInput } from '../../../inputs';
import {
    type ColorChannelDefinition,
    type ColorComplementaryChannels,
    createColorChannel,
} from '../../../primitives';
import type { DeepPartial } from '../../../private';
import type { ValueContext } from '../../../value';
import { createBaseValue } from '../base-value';

import { resolveColorChannelBaseValue } from './resolveColorChannelBaseValue';
import type { ColorChannelBaseOptions, ColorChannelBaseValue } from './types';

export const createColorChannelBaseValue = <C extends ColorComplementaryChannels>(
    channelDefinition: ColorChannelDefinition,
    context: ValueContext,
    input?: DeepPartial<ColorChannelInput>,
    options?: ColorChannelBaseOptions,
): ColorChannelBaseValue<C> => {
    const get = () => {
        const literal = resolveColorChannelBaseValue(channelDefinition, context, input);
        return createColorChannel(channelDefinition, context.primitiveContext(literal), options);
    };

    return createBaseValue(context, get);
};
