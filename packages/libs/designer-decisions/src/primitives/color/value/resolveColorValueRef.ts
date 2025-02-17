import { isColorSetDecision, isColorValueDecision } from '../../../decisions';
import type { DecisionRef } from '../../../inputs';
import type { ValueContext } from '../../../values';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../functions';
import type { Color, ColorValue } from '../../types';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveColorValueRef = (context: ValueContext, ref: DecisionRef): Color => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isColorSetDecision(decision)) {
        const value = resolveSetRefDecision<ColorValue>(decision, context, valueName, ref);
        return value ?? fallback;
    }

    if (isColorValueDecision(decision)) {
        return decision.produce(context);
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
