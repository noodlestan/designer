import { DECISION_SPACE_VALUE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { DecisionUnknown, SpaceValueDecision } from '../../../types';

export const isSpaceValueDecision = (decision: DecisionUnknown): decision is SpaceValueDecision => {
    return isDecisionOfType(decision, DECISION_SPACE_VALUE);
};
