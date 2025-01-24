import { DECISION_COLOR_OKLAB_CHROMA_VALUE } from '../../../constants';
import type { ColorOklabChromaValueDecision, DecisionUnknown } from '../../../types';

export const isColorOklabChromaValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabChromaValueDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_CHROMA_VALUE;
};
