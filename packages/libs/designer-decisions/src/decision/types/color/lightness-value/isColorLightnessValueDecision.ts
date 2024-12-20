import type { ColorLightnessValueDecision, DecisionUnknown } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_COLOR_LIGHTNESS } from './constants';

export const isColorLightnessValueDecision = (
    decision: DecisionUnknown,
): decision is ColorLightnessValueDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_COLOR_LIGHTNESS;
};
