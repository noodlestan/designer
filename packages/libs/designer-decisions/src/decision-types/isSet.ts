import { DECISION_SET_TYPES } from '../constants';
import type { Decision, DecisionUnknown } from '../decision';
import type { BaseSet } from '../values';

export const isSet = (decision: DecisionUnknown): decision is Decision<BaseSet<unknown>> => {
    return DECISION_SET_TYPES.includes(decision.type());
};
