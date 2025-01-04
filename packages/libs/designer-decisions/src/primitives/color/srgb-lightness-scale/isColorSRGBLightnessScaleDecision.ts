import { DECISION_COLOR_SRGB_LIGHTNESS_SCALE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorSRGBLightnessScaleDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBLightnessScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBLightnessScaleDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_LIGHTNESS_SCALE);
};
