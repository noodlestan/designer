import { DECISION_COLOR_SRGB_SATURATION } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorSRGBSaturationValueDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBSaturationValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBSaturationValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_SATURATION);
};
