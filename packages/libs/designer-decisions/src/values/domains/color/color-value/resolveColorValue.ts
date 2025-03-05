import { type ColorLiteral, type ColorValueInput, isDecisionRef } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import { type ValueContext } from '../../../../value';

import { resolveColorValueRef } from './resolveColorValueRef';

export const resolveColorValue = (
    context: ValueContext,
    input?: DeepPartial<ColorValueInput>,
): DeepPartial<ColorLiteral> | undefined => {
    if (isDecisionRef(input)) {
        return resolveColorValueRef(context, input);
    }

    return input as DeepPartial<ColorLiteral> | undefined;
};
