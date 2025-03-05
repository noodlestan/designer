import { type ColorChannelInput, isDecisionRef } from '../../../inputs';
import type { ColorChannelDefinition, ColorChannelLiteral } from '../../../primitives';
import type { DeepPartial } from '../../../private';
import type { ValueContext } from '../../../value';

import { resolveColorChannelBaseValueRef } from './resolveColorChannelBaseValueRef';

export const resolveColorChannelBaseValue = (
    channelDefinition: ColorChannelDefinition,
    context: ValueContext,
    input?: DeepPartial<ColorChannelInput>,
): DeepPartial<ColorChannelLiteral> | undefined => {
    if (isDecisionRef(input)) {
        return resolveColorChannelBaseValueRef(channelDefinition, context, input);
    }

    return input as ColorChannelLiteral;
};
