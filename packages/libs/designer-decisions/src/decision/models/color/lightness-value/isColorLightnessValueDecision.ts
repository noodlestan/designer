import type { ColorLightnessValueDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';

import { DECISION_COLOR_LIGHTNESS } from './constants';

export const isColorLightnessValueDecision = (
    decision: DecisionUnknown,
): decision is ColorLightnessValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_LIGHTNESS);
};
