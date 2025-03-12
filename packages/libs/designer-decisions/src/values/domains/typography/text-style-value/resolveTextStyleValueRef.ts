import { DECISION_TEXT_STYLE_VALUE } from '../../../../constants';
import { isTextStyleValueDecision } from '../../../../decision-types';
import type { DecisionRef, TextStyleObjectInput } from '../../../../inputs';
import { TEXT_STYLE_ATTRIBUTES_FALLBACK } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../../value/helpers';

const REF_CHECKED_TYPES = [DECISION_TEXT_STYLE_VALUE];

export const resolveTextStyleValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): TextStyleObjectInput => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, DECISION_TEXT_STYLE_VALUE, ref);
        return TEXT_STYLE_ATTRIBUTES_FALLBACK;
    }

    if (isTextStyleValueDecision(decision)) {
        return decision.produce(context).literal();
    }

    handleRefMismatchError(context, decision, DECISION_TEXT_STYLE_VALUE, ref, REF_CHECKED_TYPES);
    return TEXT_STYLE_ATTRIBUTES_FALLBACK;
};
