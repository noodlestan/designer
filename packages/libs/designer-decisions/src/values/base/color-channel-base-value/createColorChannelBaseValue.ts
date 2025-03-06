import type { ColorChannelInput } from '../../../inputs';
import {
    type ColorChannelDefinition,
    type ColorComplementaryChannels,
    createColorChannel,
} from '../../../primitives';
import type { ValueContext } from '../../../value';
import { createColorValue } from '../../domains';
import { createBaseValue } from '../base-value';

import { resolveColorChannelBaseValue } from './resolveColorChannelBaseValue';
import type { ColorChannelBaseOptions, ColorChannelBaseValue } from './types';

export const createColorChannelBaseValue = <C extends ColorComplementaryChannels>(
    channelDefinition: ColorChannelDefinition,
    context: ValueContext<ColorChannelInput>,
    options?: ColorChannelBaseOptions,
): ColorChannelBaseValue<C> => {
    const get = () => {
        const literal = resolveColorChannelBaseValue(channelDefinition, context);
        return createColorChannel(channelDefinition, context.primitiveContext(literal), options);
    };

    const baseValue = createBaseValue(context, get);

    return {
        ...baseValue,
        toColorValue: (channels: C) => {
            const literal = get().toColor(channels).toObject();
            return createColorValue(context.childContext(literal));
        },
    };
};
