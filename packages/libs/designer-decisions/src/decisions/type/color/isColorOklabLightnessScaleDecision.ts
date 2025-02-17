import { DECISION_COLOR_OKLAB_LIGHTNESS_SCALE } from '../../../constants';
import type { ColorOklabLightnessScaleDecision } from '../../../decisions';
import type { DecisionUnknown } from '../../types';

export const isColorOklabLightnessScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabLightnessScaleDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_LIGHTNESS_SCALE;
};
