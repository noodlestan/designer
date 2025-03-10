import { DECISION_COLOR_OKLAB_CHROMA_SCALE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { ColorOklabChromaScaleDecision } from './types';

export const isColorOklabChromaScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabChromaScaleDecision => {
    return decision.type() === DECISION_COLOR_OKLAB_CHROMA_SCALE;
};
