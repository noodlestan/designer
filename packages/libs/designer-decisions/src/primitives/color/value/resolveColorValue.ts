import type { Color, ColorInputValue, ValueContext } from '../../../types';
import { createInvalidInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import { createColor } from '../helpers';

import { FALLBACK_VALUE, VALUE_NAME, resolveColorObject } from './private';
import { resolveColorValueRef } from './resolveColorValueRef';

export const resolveColorValue = (context: ValueContext, input: ColorInputValue): Color => {
    if (isDecisionRef(input)) {
        return resolveColorValueRef(context, input);
    } else if (typeof input === 'object') {
        return resolveColorObject(input, context);
    } else if (typeof input === 'string' || typeof input === 'number') {
        try {
            const value = createColor(input);
            return value;
        } catch (error) {
            context.addError(createInvalidInputError({ context, name: VALUE_NAME, input, error }));
            return FALLBACK_VALUE;
        }
    }

    context.addError(createInvalidInputError({ context, name: VALUE_NAME, input }));
    return FALLBACK_VALUE;
};
