import { DECISION_COLOR_VALUE } from '../../../constants';
import type { ColorValueDecision } from '../../../decisions';
import type { DecisionUnknown } from '../../types';

export const isColorValueDecision = (decision: DecisionUnknown): decision is ColorValueDecision => {
    return decision.type() === DECISION_COLOR_VALUE;
};
