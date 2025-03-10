import { DECISION_LETTER_SPACING_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { LetterSpacingValueDecision } from './types';

export const isLetterSpacingValueDecision = (
    decision: DecisionUnknown,
): decision is LetterSpacingValueDecision => {
    return decision.type() === DECISION_LETTER_SPACING_VALUE;
};
