import { isDecisionRef } from '../../../../../inputs';
import { type ValueContext, createValueInputError } from '../../../../../value';

import { resolveColorChannelValueRef } from './resolveColorChannelValueRef';
import type { ColorChannelDefinition, ColorChannelInput } from './types';

export const resolveColorChannelValue = (
    channel: ColorChannelDefinition,
    context: ValueContext,
    input: ColorChannelInput,
): number => {
    const { fallback, valueName } = channel;

    if (isDecisionRef(input)) {
        return resolveColorChannelValueRef(channel, context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
