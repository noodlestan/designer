import { DECISION_TYPEFACE_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { TypefaceValueDecision } from './types';

export const isTypefaceValueDecision = (
    decision: DecisionUnknown,
): decision is TypefaceValueDecision => {
    return decision.type() === DECISION_TYPEFACE_VALUE;
};
