import { DECISION_COLOR_SRGB_LIGHTNESS_VALUE } from '../../../constants';
import type { ColorSRGBLightnessValueDecision } from '../../../decisions';
import type { DecisionUnknown } from '../../types';

export const isColorSRGBLightnessValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBLightnessValueDecision => {
    return decision.type() === DECISION_COLOR_SRGB_LIGHTNESS_VALUE;
};
