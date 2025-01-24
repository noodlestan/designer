import { DECISION_COLOR_SRGB_SATURATION_VALUE } from '../../../constants';
import type { ColorSRGBSaturationValueDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBSaturationValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBSaturationValueDecision => {
    return decision.type() === DECISION_COLOR_SRGB_SATURATION_VALUE;
};
