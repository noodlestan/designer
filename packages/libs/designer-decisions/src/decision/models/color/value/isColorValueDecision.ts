import type { ColorValueDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';

import { DECISION_COLOR_VALUE } from './constants';

export const isColorValueDecision = (decision: DecisionUnknown): decision is ColorValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_VALUE);
};
