import type { ColorHueValueDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';

import { DECISION_COLOR_HUE } from './constants';

export const isColorHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorHueValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_HUE);
};
