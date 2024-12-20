import type { ColorLightnessScaleDecision, DecisionUnknown } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_COLOR_LIGHTNESS_SCALE } from './constants';

export const isColorLightnessScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorLightnessScaleDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_COLOR_LIGHTNESS_SCALE;
};
