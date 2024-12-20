import type { DecisionUnknown, SpaceValueDecision } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_SPACE_VALUE } from './constants';

export const isSpaceValueDecision = (decision: DecisionUnknown): decision is SpaceValueDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_SPACE_VALUE;
};
