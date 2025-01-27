import type { Color } from 'chroma-js';

import { isColorSetDecision, isColorValueDecision } from '../../../decisions';
import type { DecisionRef, DecisionValueContext } from '../../../types';
import { createRefMatchError, createRefNotFoundError } from '../../../values';

import { FALLBACK_VALUE, REF_CHECKED_TYPES, VALUE_NAME } from './private';

export const resolveColorValueRef = (context: DecisionValueContext, ref: DecisionRef): Color => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError(context, VALUE_NAME, ref);
        context.addError(error);
        return FALLBACK_VALUE;
    }

    if (isColorValueDecision(decision)) {
        const v = decision.produce(context);
        return v.get();
    } else if (isColorSetDecision(decision)) {
        const set = decision.produce(context);
        const v = set.get().item(ref.index || 0);
        if (!v) {
            // WIP createRefIndexError
            const error = createRefMatchError(
                context,
                VALUE_NAME,
                ref,
                decision,
                REF_CHECKED_TYPES,
            );
            context.addError(error);
            return FALLBACK_VALUE;
        }
        return v.get();
    } else {
        const error = createRefMatchError(context, VALUE_NAME, ref, decision, REF_CHECKED_TYPES);
        context.addError(error);
        return FALLBACK_VALUE;
    }
};
