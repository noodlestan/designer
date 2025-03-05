import { DECISION_COLOR_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { ColorValueDecision } from './types';

export const isColorValueDecision = (decision: DecisionUnknown): decision is ColorValueDecision => {
    return decision.type() === DECISION_COLOR_VALUE;
};
