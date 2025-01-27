import { DECISION_COLOR_SRGB_HUE_VALUE } from '../../../constants';
import type { ColorSRGBHueValueDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBHueValueDecision => {
    return decision.type() === DECISION_COLOR_SRGB_HUE_VALUE;
};
