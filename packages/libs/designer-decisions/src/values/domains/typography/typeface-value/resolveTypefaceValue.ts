import {
    type SizeInputTypefaceInput,
    type TypefaceLiteral,
    isDecisionRef,
} from '../../../../inputs';
import { type DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';

import { resolveTypefaceValueRef } from './resolveTypefaceValueRef';

export const resolveTypefaceValue = (
    context: ValueContext<SizeInputTypefaceInput>,
): DeepPartial<TypefaceLiteral> | undefined => {
    const input = context.input();

    if (isDecisionRef(input)) {
        return resolveTypefaceValueRef(context, input);
    }

    return input as TypefaceLiteral | undefined;
};
