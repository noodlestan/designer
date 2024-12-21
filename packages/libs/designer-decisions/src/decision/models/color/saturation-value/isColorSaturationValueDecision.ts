import type { ColorSaturationValueDecision, DecisionUnknown } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';

import { DECISION_COLOR_SATURATION } from './constants';

export const isColorSaturationValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSaturationValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_SATURATION);
};
