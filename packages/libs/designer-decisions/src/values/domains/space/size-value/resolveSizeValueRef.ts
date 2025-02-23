import { isSizeScaleDecision, isSizeValueDecision } from '../../../../decision';
import type { DecisionRef, SizeObjectLiteral } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../../functions';
import type { SizeValue } from '../types';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveSizeValueRef = (context: ValueContext, ref: DecisionRef): SizeObjectLiteral => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isSizeScaleDecision(decision)) {
        const value = resolveSetRefDecision<SizeValue>(decision, context, valueName, ref);
        return value?.toObject() ?? fallback;
    }

    if (isSizeValueDecision(decision)) {
        return decision.produce(context).toObject();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
