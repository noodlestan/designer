import { isColorOklabHueValueDecision } from '../../../decisions';
import type { DecisionRef, ValueContext } from '../../../types';
import { createRefMismatchError, createRefNotFoundError } from '../../../values';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveOklabHueValueRef = (context: ValueContext, ref: DecisionRef): number => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError({ context, valueName, ref });
        context.addError(error);
        return fallback;
    }
    if (isColorOklabHueValueDecision(decision)) {
        const v = decision.produce(context);
        return v.get();
    } else {
        const error = createRefMismatchError({ context, valueName, ref, decision, accepted });
        context.addError(error);
        return fallback;
    }
};
