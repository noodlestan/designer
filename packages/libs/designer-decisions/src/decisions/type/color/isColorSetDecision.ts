import { DECISION_COLOR_SET } from '../../../constants';
import type { ColorSetDecision, DecisionUnknown } from '../../../types';

export const isColorSetDecision = (decision: DecisionUnknown): decision is ColorSetDecision => {
    return decision.type() === DECISION_COLOR_SET;
};
