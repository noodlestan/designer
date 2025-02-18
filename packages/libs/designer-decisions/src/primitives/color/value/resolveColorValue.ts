import type { ColorValueInput } from '../../../inputs';
import { type ValueContext, createValueInputError } from '../../../values';
import { isDecisionRef } from '../../ref';
import type { Color } from '../../types';
import { createColor } from '../helpers';

import { FALLBACK_VALUE as fallback, resolveColorObject, VALUE_NAME as valueName } from './private';
import { resolveColorValueRef } from './resolveColorValueRef';

export const resolveColorValue = (context: ValueContext, input: ColorValueInput): Color => {
    if (isDecisionRef(input)) {
        return resolveColorValueRef(context, input);
    } else if (typeof input === 'object') {
        return resolveColorObject(input, context);
    } else if (typeof input === 'string' || typeof input === 'number') {
        try {
            const value = createColor(input);
            return value;
        } catch (error) {
            context.addError(createValueInputError({ context, valueName, input, error }));
            return fallback;
        }
    }

    context.addError(createValueInputError({ context, valueName, input }));
    return fallback;
};
