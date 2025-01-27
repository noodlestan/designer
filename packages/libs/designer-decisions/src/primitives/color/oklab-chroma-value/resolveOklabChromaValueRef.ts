import { isColorOklabChromaValueDecision } from '../../../decisions';
import type { DecisionRef, DecisionValueContext } from '../../../types';
import { createRefMatchError, createRefNotFoundError } from '../../../values';

import { FALLBACK_VALUE, REF_CHECKED_TYPES, VALUE_NAME } from './private';

export const resolveOklabChromaValueRef = (
    context: DecisionValueContext,
    ref: DecisionRef,
): number => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError(context, VALUE_NAME, ref);
        context.addError(error);
        return FALLBACK_VALUE;
    }
    if (isColorOklabChromaValueDecision(decision)) {
        const v = decision.produce(context);
        return v.get();
    } else {
        const error = createRefMatchError(context, VALUE_NAME, ref, decision, REF_CHECKED_TYPES);
        context.addError(error);
        return FALLBACK_VALUE;
    }
};
