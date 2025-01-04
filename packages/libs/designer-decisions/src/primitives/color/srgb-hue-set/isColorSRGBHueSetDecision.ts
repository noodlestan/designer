import { DECISION_COLOR_SRGB_HUE_SET } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorSRGBHueSetDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBHueSetDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBHueSetDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_HUE_SET);
};
