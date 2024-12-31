import type { DecisionUnknown, SpaceValueDecision } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';
import { DECISION_SPACE_VALUE } from '../constants';

export const isSpaceValueDecision = (decision: DecisionUnknown): decision is SpaceValueDecision => {
    return isDecisionOfType(decision, DECISION_SPACE_VALUE);
};
