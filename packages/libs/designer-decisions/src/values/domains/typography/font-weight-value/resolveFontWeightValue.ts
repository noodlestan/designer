import { type FontWeightInput, type FontWeightLiteral, isDecisionRef } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import { type ValueContext, createValueInputError } from '../../../../value';
import { type FontWeight, createFontWeight, isValidFontWeightName } from '../../../primitives';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveFontWeightValueRef } from './resolveFontWeightValueRef';

export const resolveFontWeightValue = (
    context: ValueContext,
    input: DeepPartial<FontWeightInput>,
): FontWeight => {
    if (isDecisionRef(input)) {
        return resolveFontWeightValueRef(context, input);
    }

    if (typeof input === 'string') {
        if (!isValidFontWeightName(input)) {
            context.addError(createValueInputError({ context, valueName, input }));
            return fallback;
        }
        return createFontWeight(input as FontWeightLiteral);
    }

    if (typeof input === 'number') {
        return createFontWeight(input);
    }

    context.addError(createValueInputError({ context, valueName, input }));
    return fallback;
};
