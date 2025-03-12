import { D_LETTER_SPACING_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { LetterSpacingValue } from '../../values';

export const isLetterSpacingValue = (
    decision: DecisionUnknown,
): decision is Decision<LetterSpacingValue> => {
    return decision.type() === D_LETTER_SPACING_VALUE;
};
