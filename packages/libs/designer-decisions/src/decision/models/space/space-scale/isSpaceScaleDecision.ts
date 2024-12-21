import type { DecisionUnknown, SpaceScaleDecision } from '../../../../types';
import { isDecisionOfType } from '../../../helpers';

import { DECISION_SPACE_SCALE } from './constants';

export const isSpaceScaleDecision = (decision: DecisionUnknown): decision is SpaceScaleDecision => {
    return isDecisionOfType(decision, DECISION_SPACE_SCALE);
};
