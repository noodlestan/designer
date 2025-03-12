import { type TextStyleInput, type TextStyleObjectInput, isDecisionRef } from '../../../../inputs';
import { type DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';

import { resolveTextStyleValueRef } from './resolveTextStyleValueRef';

export const resolveTextStyleValue = (
    context: ValueContext<TextStyleInput>,
): DeepPartial<TextStyleObjectInput> | undefined => {
    const input = context.input();

    if (isDecisionRef(input)) {
        return resolveTextStyleValueRef(context, input);
    }

    return input as TextStyleObjectInput | undefined;
};
