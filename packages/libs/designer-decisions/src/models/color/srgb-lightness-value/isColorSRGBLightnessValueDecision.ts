import { DECISION_COLOR_SRGB_LIGHTNESS } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorSRGBLightnessValueDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBLightnessValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBLightnessValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_LIGHTNESS);
};
