import { DECISION_COLOR_OKLAB_CHROMA_SCALE } from '../../../constants';
import type { ColorOklabChromaScaleDecision, DecisionUnknown } from '../../../types';

export const isColorOklabChromaScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabChromaScaleDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_CHROMA_SCALE;
};
