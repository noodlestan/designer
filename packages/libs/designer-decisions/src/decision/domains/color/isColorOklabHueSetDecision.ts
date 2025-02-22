import { DECISION_COLOR_OKLAB_HUE_SET } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { ColorOklabHueSetDecision } from './types';

export const isColorOklabHueSetDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabHueSetDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_HUE_SET;
};
