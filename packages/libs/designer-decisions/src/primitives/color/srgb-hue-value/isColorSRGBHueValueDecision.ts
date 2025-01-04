import { DECISION_COLOR_SRGB_HUE_VALUE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorSRGBHueValueDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBHueValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_HUE_VALUE);
};
