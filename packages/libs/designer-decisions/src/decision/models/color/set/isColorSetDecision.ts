import type { ColorSetDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';

import { DECISION_COLOR_SET } from './constants';

export const isColorSetDecision = (decision: DecisionUnknown): decision is ColorSetDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SET);
};
