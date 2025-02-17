import { SET_DECISION_TYPES } from '../../constants';
import type { BaseSet } from '../../primitives';
import type { Decision, DecisionUnknown } from '../types';

export const isSetDecision = (
    decision: DecisionUnknown,
): decision is Decision<BaseSet<unknown>> => {
    return SET_DECISION_TYPES.includes(decision.type());
};
