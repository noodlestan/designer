import { SET_DECISION_TYPES } from '../constants';
import type { Decision, DecisionUnknown } from '../decision';
import type { BaseSet } from '../values';

export const isSetDecision = (
    decision: DecisionUnknown,
): decision is Decision<BaseSet<unknown>> => {
    return SET_DECISION_TYPES.includes(decision.type());
};
