import { DECISION_COLOR_OKLAB_LIGHTNESS_VALUE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { ColorOklabLightnessValueDecision } from './types';

export const isColorOklabLightnessValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabLightnessValueDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_LIGHTNESS_VALUE;
};
