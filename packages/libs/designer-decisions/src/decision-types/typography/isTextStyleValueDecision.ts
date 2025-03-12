import { DECISION_TEXT_STYLE_VALUE } from '../../constants';
import type { DecisionUnknown } from '../../decision';

import type { TextStyleValueDecision } from './types';

export const isTextStyleValueDecision = (
    decision: DecisionUnknown,
): decision is TextStyleValueDecision => {
    return decision.type() === DECISION_TEXT_STYLE_VALUE;
};
