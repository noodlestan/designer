import { D_FONT_FAMILY_VALUE } from '../../../../constants';
import { isFontFamilyValue } from '../../../../decision-types';
import type { DecisionRef, FontFamilyArrayLiteral } from '../../../../inputs';
import { FONT_FAMILY_FALLBACK_LITERAL } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../../value/helpers';

const REF_CHECKED_TYPES = [D_FONT_FAMILY_VALUE];

export const resolveFontFamilyValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): FontFamilyArrayLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, D_FONT_FAMILY_VALUE, ref);
        return FONT_FAMILY_FALLBACK_LITERAL;
    }

    if (isFontFamilyValue(decision)) {
        return decision.produce(context).families;
    }

    handleRefMismatchError(context, decision, D_FONT_FAMILY_VALUE, ref, REF_CHECKED_TYPES);
    return FONT_FAMILY_FALLBACK_LITERAL;
};
