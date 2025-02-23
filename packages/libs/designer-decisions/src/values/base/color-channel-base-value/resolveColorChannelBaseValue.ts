import { isDecisionRef } from '../../../inputs';
import { type ValueContext, createValueInputError } from '../../../value';

import { resolveColorChannelBaseValueRef } from './resolveColorChannelBaseValueRef';
import type { ColorChannelDefinition, ColorChannelInput } from './types';

export const resolveColorChannelBaseValue = (
    channelDefinition: ColorChannelDefinition,
    context: ValueContext,
    input: ColorChannelInput,
): number => {
    const { fallback, valueName } = channelDefinition;

    if (isDecisionRef(input)) {
        return resolveColorChannelBaseValueRef(channelDefinition, context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
