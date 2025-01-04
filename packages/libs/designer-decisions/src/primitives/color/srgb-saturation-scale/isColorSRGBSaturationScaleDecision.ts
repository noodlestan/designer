import { DECISION_COLOR_SRGB_SATURATION_SCALE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorSRGBSaturationScaleDecision, DecisionUnknown } from '../../../types';

export const isColorSRGBSaturationScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBSaturationScaleDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_SATURATION_SCALE);
};
