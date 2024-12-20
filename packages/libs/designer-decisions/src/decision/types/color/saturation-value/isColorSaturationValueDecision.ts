import type { ColorSaturationValueDecision, DecisionUnknown } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_COLOR_SATURATION } from './constants';

export const isColorSaturationValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSaturationValueDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_COLOR_SATURATION;
};
