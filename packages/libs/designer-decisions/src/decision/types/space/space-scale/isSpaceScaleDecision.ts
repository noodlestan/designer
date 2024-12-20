import type { DecisionUnknown, SpaceScaleDecision } from '../../../../types';
import { getDecisionModelDecisionType } from '../../../meta';

import { DECISION_SPACE_SCALE } from './constants';

export const isSpaceScaleDecision = (decision: DecisionUnknown): decision is SpaceScaleDecision => {
    return getDecisionModelDecisionType(decision.input().model) === DECISION_SPACE_SCALE;
};
