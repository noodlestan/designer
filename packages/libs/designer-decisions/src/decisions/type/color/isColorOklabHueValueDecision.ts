import { DECISION_COLOR_OKLAB_HUE_VALUE } from '../../../constants';
import type { ColorOklabHueValueDecision } from '../../../decisions';
import type { DecisionUnknown } from '../../types';

export const isColorOklabHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabHueValueDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_HUE_VALUE;
};
