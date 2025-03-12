import { D_FONT_FAMILY_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { FontFamilyValue } from '../../values';

export const isFontFamilyValue = (
    decision: DecisionUnknown,
): decision is Decision<FontFamilyValue> => {
    return decision.type() === D_FONT_FAMILY_VALUE;
};
