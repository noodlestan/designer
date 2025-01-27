import { isSpaceScaleDecision, isSpaceValueDecision } from '../../../decisions';
import type { DecisionRef, DecisionValueContext, SpaceWithUnits } from '../../../types';
import { createRefMatchError, createRefNotFoundError } from '../../../values';

import { FALLBACK_VALUE, REF_CHECKED_TYPES, VALUE_NAME } from './private';

export const resolveSpaceValueRef = (
    context: DecisionValueContext,
    ref: DecisionRef,
): SpaceWithUnits => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError(context, VALUE_NAME, ref);
        context.addError(error);
        return FALLBACK_VALUE;
    }

    if (isSpaceValueDecision(decision)) {
        const v = decision.produce(context);
        return v.getValueWithUnits();
    } else if (isSpaceScaleDecision(decision)) {
        const scale = decision.produce(context);
        const v = scale.get().item(ref.index || 0);
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
        return v.getValueWithUnits();
    } else {
        const error = createRefMatchError(context, VALUE_NAME, ref, decision, REF_CHECKED_TYPES);
        context.addError(error);
        return FALLBACK_VALUE;
    }
};
