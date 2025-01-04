import { DECISION_COLOR_OKLAB_HUE_VALUE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorOklabHueValueDecision, DecisionUnknown } from '../../../types';

export const isColorOklabHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabHueValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_OKLAB_HUE_VALUE);
};
