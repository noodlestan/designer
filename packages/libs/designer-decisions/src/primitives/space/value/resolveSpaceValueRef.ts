import { isSpaceScaleDecision, isSpaceValueDecision } from '../../../decisions';
import type { DecisionRef, SpaceValue, SpaceWithUnits, ValueContext } from '../../../types';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../functions';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveSpaceValueRef = (context: ValueContext, ref: DecisionRef): SpaceWithUnits => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isSpaceScaleDecision(decision)) {
        const value = resolveSetRefDecision<SpaceValue>(decision, context, valueName, ref);
        return value?.toObject() ?? fallback;
    }

    if (isSpaceValueDecision(decision)) {
        return decision.produce(context).toObject();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
