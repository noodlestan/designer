import { DECISION_COLOR_VALUE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorValueDecision, DecisionUnknown } from '../../../types';

export const isColorValueDecision = (decision: DecisionUnknown): decision is ColorValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_VALUE);
};
