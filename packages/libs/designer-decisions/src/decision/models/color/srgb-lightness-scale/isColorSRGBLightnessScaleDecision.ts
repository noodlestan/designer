import type { ColorSRGBLightnessScaleDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';
import { DECISION_COLOR_SRGB_LIGHTNESS_SCALE } from '../constants';

export const isColorSRGBLightnessScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBLightnessScaleDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_LIGHTNESS_SCALE);
};
