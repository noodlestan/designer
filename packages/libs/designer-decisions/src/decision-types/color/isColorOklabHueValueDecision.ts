import { DECISION_COLOR_OKLAB_HUE_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { ColorOklabHueValueDecision } from './types';

export const isColorOklabHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabHueValueDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_HUE_VALUE;
};
