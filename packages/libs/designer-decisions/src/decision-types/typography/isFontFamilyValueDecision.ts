import { DECISION_FONT_FAMILY_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { FontFamilyValueDecision } from './types';

export const isFontFamilyValueDecision = (
    decision: DecisionUnknown,
): decision is FontFamilyValueDecision => {
    return decision.type() === DECISION_FONT_FAMILY_VALUE;
};
