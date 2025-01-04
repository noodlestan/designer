import { DECISION_COLOR_OKLAB_CHROMA_VALUE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorOklabChromaValueDecision, DecisionUnknown } from '../../../types';

export const isColorOklabChromaValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabChromaValueDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_OKLAB_CHROMA_VALUE);
};
