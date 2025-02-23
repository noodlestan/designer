import { isFontWeightValueDecision } from '../../../../decision';
import type { DecisionRef } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../functions';
import type { FontWeight } from '../../../primitives';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveFontWeightValueRef = (context: ValueContext, ref: DecisionRef): FontWeight => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isFontWeightValueDecision(decision)) {
        return decision.produce(context).get();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
