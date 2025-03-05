import { DECISION_COLOR_OKLAB_CHROMA_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { ColorOklabChromaValueDecision } from './types';

export const isColorOklabChromaValueDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabChromaValueDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_CHROMA_VALUE;
};
