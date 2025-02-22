import { DECISION_SPACE_SCALE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { SpaceScaleDecision } from './types';

export const isSpaceScaleDecision = (decision: DecisionUnknown): decision is SpaceScaleDecision => {
    return decision.type() === DECISION_SPACE_SCALE;
};
