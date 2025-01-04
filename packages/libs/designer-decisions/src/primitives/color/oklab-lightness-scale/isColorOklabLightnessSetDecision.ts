import { DECISION_COLOR_OKLAB_LIGHTNESS_SCALE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorOklabLightnessScaleDecision, DecisionUnknown } from '../../../types';

export const isColorOklabLightnessScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabLightnessScaleDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_OKLAB_LIGHTNESS_SCALE);
};
