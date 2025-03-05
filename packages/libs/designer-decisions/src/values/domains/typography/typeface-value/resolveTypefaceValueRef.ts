import { DECISION_TYPEFACE_VALUE } from '../../../../constants';
import { isTypefaceValueDecision } from '../../../../decision-types';
import type { DecisionRef, TypefaceObjectLiteral } from '../../../../inputs';
import { TYPEFACE_FALLBACK_LITERAL } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../../value/helpers';

const REF_CHECKED_TYPES = [DECISION_TYPEFACE_VALUE];

export const resolveTypefaceValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): TypefaceObjectLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, DECISION_TYPEFACE_VALUE, ref);
        return TYPEFACE_FALLBACK_LITERAL;
    }

    if (isTypefaceValueDecision(decision)) {
        return decision.produce(context).get().literal();
    }

    handleRefMismatchError(context, decision, DECISION_TYPEFACE_VALUE, ref, REF_CHECKED_TYPES);
    return TYPEFACE_FALLBACK_LITERAL;
};
