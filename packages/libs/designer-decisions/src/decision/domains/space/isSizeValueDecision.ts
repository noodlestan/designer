import { DECISION_SIZE_VALUE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { SizeValueDecision } from './types';

export const isSizeValueDecision = (decision: DecisionUnknown): decision is SizeValueDecision => {
    return decision.type() === DECISION_SIZE_VALUE;
};
