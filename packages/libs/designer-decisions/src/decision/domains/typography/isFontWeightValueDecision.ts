import { DECISION_FONT_WEIGHT_VALUE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { FontWeightValueDecision } from './types';

export const isFontWeightValueDecision = (
    decision: DecisionUnknown,
): decision is FontWeightValueDecision => {
    return decision.type() === DECISION_FONT_WEIGHT_VALUE;
};
