import { D_TYPEFACE_VALUE } from '../../../../constants';
import { isTypefaceValue } from '../../../../decision-types';
import type { DecisionRef, TypefaceObjectLiteral } from '../../../../inputs';
import { TYPEFACE_FALLBACK_LITERAL } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../../value/helpers';

const REF_CHECKED_TYPES = [D_TYPEFACE_VALUE];

export const resolveTypefaceValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): TypefaceObjectLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, D_TYPEFACE_VALUE, ref);
        return TYPEFACE_FALLBACK_LITERAL;
    }

    if (isTypefaceValue(decision)) {
        return decision.produce(context).literal();
    }

    handleRefMismatchError(context, decision, D_TYPEFACE_VALUE, ref, REF_CHECKED_TYPES);
    return TYPEFACE_FALLBACK_LITERAL;
};
