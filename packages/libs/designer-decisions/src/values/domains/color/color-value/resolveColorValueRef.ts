import {
    DECISION_COLOR_SET,
    DECISION_COLOR_VALUE,
    DECISION_COLOR_VALUE as valueName,
} from '../../../../constants';
import { isColorSetDecision, isColorValueDecision } from '../../../../decision-types';
import type { ColorOkLCHLiteral, DecisionRef } from '../../../../inputs';
import { COLOR_FALLBACK_LITERAL } from '../../../../primitives';
import {
    type ValueContext,
    handleDecisionNotFound,
    handleRefMismatchError,
} from '../../../../value';
import { resolveSetRefDecision } from '../../../functions';
import type { ColorValue } from '../types';

const REF_CHECKED_TYPES = [DECISION_COLOR_SET, DECISION_COLOR_VALUE];

export const resolveColorValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): ColorOkLCHLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return COLOR_FALLBACK_LITERAL;
    }

    if (isColorSetDecision(decision)) {
        const value = resolveSetRefDecision<ColorValue>(context, decision, valueName, ref);
        return value?.toObject() ?? COLOR_FALLBACK_LITERAL;
    }

    if (isColorValueDecision(decision)) {
        return decision.produce(context).toObject();
    }

    handleRefMismatchError(context, decision, valueName, ref, REF_CHECKED_TYPES);
    return COLOR_FALLBACK_LITERAL;
};
