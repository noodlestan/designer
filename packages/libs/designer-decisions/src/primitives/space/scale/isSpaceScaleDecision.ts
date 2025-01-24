import { DECISION_SPACE_SCALE } from '../../../constants';
import type { DecisionUnknown, SpaceScaleDecision } from '../../../types';

export const isSpaceScaleDecision = (decision: DecisionUnknown): decision is SpaceScaleDecision => {
    return decision.type() === DECISION_SPACE_SCALE;
};
