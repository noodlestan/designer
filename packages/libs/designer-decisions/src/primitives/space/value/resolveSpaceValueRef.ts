import { isSpaceScaleDecision, isSpaceValueDecision } from '../../../decisions';
import type { DecisionRef, SpaceWithUnits, ValueContext } from '../../../types';
import {
    createRefIndexError,
    createRefMismatchError,
    createRefNotFoundError,
} from '../../../values';

import { FALLBACK_VALUE, REF_CHECKED_TYPES as accepted, VALUE_NAME as name } from './private';

export const resolveSpaceValueRef = (context: ValueContext, ref: DecisionRef): SpaceWithUnits => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError({ context, name, ref });
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
            const error = createRefIndexError({ context, name, ref });
            context.addError(error);
            return FALLBACK_VALUE;
        }
        return v.getValueWithUnits();
    } else {
        const error = createRefMismatchError({ context, name, ref, decision, accepted });
        context.addError(error);
        return FALLBACK_VALUE;
    }
};
