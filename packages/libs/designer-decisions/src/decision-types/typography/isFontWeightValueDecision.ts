import { DECISION_FONT_WEIGHT_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { FontWeightValueDecision } from './types';

export const isFontWeightValueDecision = (
    decision: DecisionUnknown,
): decision is FontWeightValueDecision => {
    return decision.type() === DECISION_FONT_WEIGHT_VALUE;
};
