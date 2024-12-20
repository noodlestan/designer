import type { ColorLightnessValueDecision, DecisionUnknown } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_COLOR_HUE } from './constants';

export const isColorHueValueDecision = (
    decision: DecisionUnknown,
): decision is ColorLightnessValueDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_COLOR_HUE;
};
