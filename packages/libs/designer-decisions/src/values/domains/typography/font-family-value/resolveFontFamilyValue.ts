import {
    type FontFamilyLiteral,
    type FontFamilyValueInput,
    isDecisionRef,
} from '../../../../inputs';
import { type DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';

import { resolveFontFamilyValueRef } from './resolveFontFamilyValueRef';

export const resolveFontFamilyValue = (
    context: ValueContext<FontFamilyValueInput>,
): DeepPartial<FontFamilyLiteral> | undefined => {
    const input = context.input();

    if (isDecisionRef(input)) {
        return resolveFontFamilyValueRef(context, input);
    }

    return input as FontFamilyLiteral | undefined;
};
