import { DECISION_COLOR_OKLAB_LIGHTNESS_VALUE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorOklabLightnessValueDecision, DecisionUnknown } from '../../../types';

export const isColorOklabLightnessValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabLightnessValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_OKLAB_LIGHTNESS_VALUE);
};
