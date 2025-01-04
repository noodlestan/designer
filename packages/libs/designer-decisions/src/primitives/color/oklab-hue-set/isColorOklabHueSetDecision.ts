import { DECISION_COLOR_OKLAB_HUE_SET } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorOklabHueSetDecision, DecisionUnknown } from '../../../types';

export const isColorOklabHueSetDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabHueSetDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_OKLAB_HUE_SET);
};
