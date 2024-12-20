import type { ColorValueDecision, DecisionUnknown } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_COLOR_VALUE } from './constants';

export const isColorValueDecision = (decision: DecisionUnknown): decision is ColorValueDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_COLOR_VALUE;
};
