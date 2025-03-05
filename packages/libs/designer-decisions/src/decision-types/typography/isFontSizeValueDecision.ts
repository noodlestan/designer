import { DECISION_FONT_SIZE_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { FontSizeValueDecision } from './types';

export const isFontSizeValueDecision = (
    decision: DecisionUnknown,
): decision is FontSizeValueDecision => {
    return decision.type() === DECISION_FONT_SIZE_VALUE;
};
