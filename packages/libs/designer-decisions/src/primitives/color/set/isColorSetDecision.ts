import { DECISION_COLOR_SET } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorSetDecision, DecisionUnknown } from '../../../types';

export const isColorSetDecision = (decision: DecisionUnknown): decision is ColorSetDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SET);
};
