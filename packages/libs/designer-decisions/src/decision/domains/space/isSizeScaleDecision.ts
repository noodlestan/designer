import { DECISION_SIZE_SCALE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { SizeScaleDecision } from './types';

export const isSizeScaleDecision = (decision: DecisionUnknown): decision is SizeScaleDecision => {
    return decision.type() === DECISION_SIZE_SCALE;
};
