import type { ColorLightnessScaleDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';

import { DECISION_COLOR_LIGHTNESS_SCALE } from './constants';

export const isColorLightnessScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorLightnessScaleDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_LIGHTNESS_SCALE);
};
