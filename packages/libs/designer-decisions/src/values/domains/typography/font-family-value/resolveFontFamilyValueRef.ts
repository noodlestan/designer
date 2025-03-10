import { DECISION_FONT_FAMILY_VALUE } from '../../../../constants';
import { isFontFamilyValueDecision } from '../../../../decision-types';
import type { DecisionRef, FontFamilyArrayLiteral } from '../../../../inputs';
import { FONT_FAMILY_FALLBACK_LITERAL } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../../value/helpers';

const REF_CHECKED_TYPES = [DECISION_FONT_FAMILY_VALUE];

export const resolveFontFamilyValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): FontFamilyArrayLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, DECISION_FONT_FAMILY_VALUE, ref);
        return FONT_FAMILY_FALLBACK_LITERAL;
    }

    if (isFontFamilyValueDecision(decision)) {
        return decision.produce(context).families;
    }

    handleRefMismatchError(context, decision, DECISION_FONT_FAMILY_VALUE, ref, REF_CHECKED_TYPES);
    return FONT_FAMILY_FALLBACK_LITERAL;
};
