import { DECISION_SPACE_SCALE } from '../../../constants';
import { isDecisionOfType } from '../../../helpers';
import type { DecisionUnknown, SpaceScaleDecision } from '../../../types';

export const isSpaceScaleDecision = (decision: DecisionUnknown): decision is SpaceScaleDecision => {
    return isDecisionOfType(decision, DECISION_SPACE_SCALE);
};
