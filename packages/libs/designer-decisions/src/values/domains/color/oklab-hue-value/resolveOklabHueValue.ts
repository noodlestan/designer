import { type ColorOklabHueInput, isDecisionRef } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createValueInputError } from '../../../../value';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './private';
import { resolveOklabHueValueRef } from './resolveOklabHueValueRef';

export const resolveOklabHueValue = (context: ValueContext, input: ColorOklabHueInput): number => {
    if (isDecisionRef(input)) {
        return resolveOklabHueValueRef(context, input);
    }

    if (typeof input !== 'number') {
        context.addError(createValueInputError({ context, valueName, input }));
        return fallback;
    }

    return input;
};
