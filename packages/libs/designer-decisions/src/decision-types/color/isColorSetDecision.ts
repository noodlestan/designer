import { DECISION_COLOR_SET } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { ColorSetDecision } from './types';

export const isColorSetDecision = (decision: DecisionUnknown): decision is ColorSetDecision => {
    return decision.type() === DECISION_COLOR_SET;
};
