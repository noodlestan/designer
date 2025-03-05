import { type TypefaceLiteral, type TypefaceValueInput, isDecisionRef } from '../../../../inputs';
import { type DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';

import { resolveTypefaceValueRef } from './resolveTypefaceValueRef';

export const resolveTypefaceValue = (
    context: ValueContext,
    input?: DeepPartial<TypefaceValueInput>,
): DeepPartial<TypefaceLiteral> | undefined => {
    if (isDecisionRef(input)) {
        return resolveTypefaceValueRef(context, input);
    }

    return input as TypefaceLiteral | undefined;
};
