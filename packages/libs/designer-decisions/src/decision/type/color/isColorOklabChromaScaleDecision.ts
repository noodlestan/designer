import { DECISION_COLOR_OKLAB_CHROMA_SCALE } from '../../../constants';
import type { ColorOklabChromaScaleDecision } from '../../../decision';
import type { DecisionUnknown } from '../../types';

export const isColorOklabChromaScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabChromaScaleDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_CHROMA_SCALE;
};
