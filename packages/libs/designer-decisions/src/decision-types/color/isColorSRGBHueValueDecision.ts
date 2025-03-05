import { DECISION_COLOR_SRGB_HUE_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { ColorSRGBHueValueDecision } from './types';

export const isColorSRGBHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBHueValueDecision => {
    return decision.type() === DECISION_COLOR_SRGB_HUE_VALUE;
};
