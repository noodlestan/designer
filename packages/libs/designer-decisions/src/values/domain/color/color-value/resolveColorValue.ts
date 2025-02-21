import { type ColorValueInput, isDecisionRef } from '../../../../inputs';
import { type ValueContext, createValueInputError } from '../../../../value';
import { type Color, createColor } from '../../../primitives';

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
