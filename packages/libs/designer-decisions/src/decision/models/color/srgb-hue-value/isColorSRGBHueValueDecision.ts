import type { ColorSRGBHueValueDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';
import { DECISION_COLOR_SRGB_HUE } from '../constants';

export const isColorSRGBHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBHueValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_HUE);
};
