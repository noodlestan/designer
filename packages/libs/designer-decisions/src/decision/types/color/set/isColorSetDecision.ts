import type { ColorSetDecision, DecisionUnknown } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_COLOR_SET } from './constants';

export const isColorSetDecision = (decision: DecisionUnknown): decision is ColorSetDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_COLOR_SET;
};
