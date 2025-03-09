import {
    type LineHeightInput,
    type LineHeightObjectLiteral,
    isDecisionRef,
} from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import { type ValueContext } from '../../../../value';

import { resolveLineHeightValueRef } from './resolveLineHeightValueRef';

export const resolveLineHeightValue = (
    context: ValueContext<LineHeightInput>,
): DeepPartial<LineHeightObjectLiteral> | undefined => {
    const input = context.input();

    if (isDecisionRef(input)) {
        return resolveLineHeightValueRef(context, input);
    }

    return input as DeepPartial<LineHeightObjectLiteral> | undefined;
};
