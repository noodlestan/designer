import { DECISION_COLOR_OKLAB_CHROMA_SCALE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { ColorOklabChromaScaleDecision, DecisionUnknown } from '../../../types';

export const isColorOklabChromaScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorOklabChromaScaleDecision => {
    return isDecisionOfType(decision, DECISION_COLOR_OKLAB_CHROMA_SCALE);
};
