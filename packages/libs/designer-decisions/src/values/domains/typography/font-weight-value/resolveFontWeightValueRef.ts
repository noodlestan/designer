import { D_FONT_WEIGHT_VALUE } from '../../../../constants';
import { isFontWeightValue } from '../../../../decision-types';
import type { DecisionRef, FontWeightObjectLiteral } from '../../../../inputs';
import { FONT_WEIGHT_FALLBACK_LITERAL } from '../../../../primitives';
import {
    type ValueContext,
    handleDecisionNotFound,
    handleRefMismatchError,
} from '../../../../value';

const REF_CHECKED_TYPES = [D_FONT_WEIGHT_VALUE];

export const resolveFontWeightValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): FontWeightObjectLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, D_FONT_WEIGHT_VALUE, ref);
        return FONT_WEIGHT_FALLBACK_LITERAL;
    }

    // if (isFontWeightScale(decision)) {
    //     const value = resolveSetRefDecision<FontWeightValue>(
    //         context,
    //         decision,
    //         D_FONT_WEIGHT_VALUE,
    //         ref,
    //     );
    //     return value?.toObject() ?? fallback;
    // }

    if (isFontWeightValue(decision)) {
        return decision.produce(context).literal();
    }

    handleRefMismatchError(context, decision, D_FONT_WEIGHT_VALUE, ref, REF_CHECKED_TYPES);
    return FONT_WEIGHT_FALLBACK_LITERAL;
};
