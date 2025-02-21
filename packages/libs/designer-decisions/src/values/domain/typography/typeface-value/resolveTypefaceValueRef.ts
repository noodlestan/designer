import { isTypefaceValueDecision } from '../../../../decision';
import type { DecisionRef } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../functions';
import type { Typeface } from '../types';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveTypefaceValueRef = (context: ValueContext, ref: DecisionRef): Typeface => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isTypefaceValueDecision(decision)) {
        return decision.produce(context).get();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
