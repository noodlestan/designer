import { isColorOklabHueValueDecision } from '../../../decisions';
import type { DecisionRef, ValueContext } from '../../../types';
import { createRefMismatchError, createRefNotFoundError } from '../../../values';

import { FALLBACK_VALUE, REF_CHECKED_TYPES as accepted, VALUE_NAME as name } from './private';

export const resolveOklabHueValueRef = (context: ValueContext, ref: DecisionRef): number => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError({ context, name, ref });
        context.addError(error);
        return FALLBACK_VALUE;
    }
    if (isColorOklabHueValueDecision(decision)) {
        const v = decision.produce(context);
        return v.get();
    } else {
        const error = createRefMismatchError({ context, name, ref, decision, accepted });
        context.addError(error);
        return FALLBACK_VALUE;
    }
};
