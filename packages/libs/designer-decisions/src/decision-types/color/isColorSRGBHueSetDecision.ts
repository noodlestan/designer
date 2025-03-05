import { DECISION_COLOR_SRGB_HUE_SET } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { ColorSRGBHueSetDecision } from './types';

export const isColorSRGBHueSetDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBHueSetDecision => {
    return decision.type() === DECISION_COLOR_SRGB_HUE_SET;
};
