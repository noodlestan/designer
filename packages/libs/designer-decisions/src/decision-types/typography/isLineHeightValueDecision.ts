import { DECISION_LINE_HEIGHT_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { LineHeightValueDecision } from './types';

export const isLineHeightValueDecision = (
    decision: DecisionUnknown,
): decision is LineHeightValueDecision => {
    return decision.type() === DECISION_LINE_HEIGHT_VALUE;
};
