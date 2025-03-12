import { D_LINE_HEIGHT_VALUE } from '../../../../constants';
import { isLineHeightValue } from '../../../../decision-types';
import type { DecisionRef, LineHeightObjectLiteral } from '../../../../inputs';
import { LINE_HEIGHT_FALLBACK_LITERAL } from '../../../../primitives';
import {
    type ValueContext,
    handleDecisionNotFound,
    handleRefMismatchError,
} from '../../../../value';

const REF_CHECKED_TYPES = [D_LINE_HEIGHT_VALUE];

export const resolveLineHeightValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): LineHeightObjectLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, D_LINE_HEIGHT_VALUE, ref);
        return LINE_HEIGHT_FALLBACK_LITERAL;
    }

    // if (isLineHeightScale(decision)) {
    //     const value = resolveSetRefDecision<LineHeightValue>(
    //         context,
    //         decision,
    //         D_LINE_HEIGHT_VALUE,
    //         ref,
    //     );
    //     return value?.toObject() ?? fallback;
    // }

    if (isLineHeightValue(decision)) {
        return decision.produce(context).literal();
    }

    handleRefMismatchError(context, decision, D_LINE_HEIGHT_VALUE, ref, REF_CHECKED_TYPES);
    return LINE_HEIGHT_FALLBACK_LITERAL;
};
