import type { ColorOklabHueInput } from '../../../inputs';
import type { ValueContext } from '../../../values';
import { createValueInputError } from '../../../values';
import { isDecisionRef } from '../../ref';

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
