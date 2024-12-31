import type { DecisionUnknown } from '../types';

export const getDecisionType = (decision: DecisionUnknown): string => {
    return decision.input().model.split('/')[0];
};
