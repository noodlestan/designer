import type { ColorSRGBLightnessValueDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';
import { DECISION_COLOR_SRGB_LIGHTNESS } from '../constants';

export const isColorSRGBLightnessValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBLightnessValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SRGB_LIGHTNESS);
};
