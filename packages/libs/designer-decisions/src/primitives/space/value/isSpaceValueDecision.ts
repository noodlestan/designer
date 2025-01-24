import { DECISION_SPACE_VALUE } from '../../../constants';
import type { DecisionUnknown, SpaceValueDecision } from '../../../types';

export const isSpaceValueDecision = (decision: DecisionUnknown): decision is SpaceValueDecision => {
    return decision.type() === DECISION_SPACE_VALUE;
};
