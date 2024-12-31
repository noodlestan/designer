import type { ColorSRGBSaturationValueDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';
import { DECISION_COLOR_SRGB_SATURATION } from '../constants';

export const isColorSRGBSaturationValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBSaturationValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_SATURATION);
};
