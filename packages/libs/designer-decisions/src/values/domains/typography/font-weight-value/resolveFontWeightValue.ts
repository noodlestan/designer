import {
    type FontWeightInput,
    type FontWeightObjectLiteral,
    isDecisionRef,
} from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import { type ValueContext } from '../../../../value';

import { resolveFontWeightValueRef } from './resolveFontWeightValueRef';

export const resolveFontWeightValue = (
    context: ValueContext<FontWeightInput>,
): DeepPartial<FontWeightObjectLiteral> | undefined => {
    const input = context.input();

    if (isDecisionRef(input)) {
        return resolveFontWeightValueRef(context, input);
    }

    return input as DeepPartial<FontWeightObjectLiteral> | undefined;
};
