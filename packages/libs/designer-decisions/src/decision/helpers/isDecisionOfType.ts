import type { DecisionUnknown } from '../../types';

export const isDecisionOfType = (decision: DecisionUnknown, type: string): boolean => {
    return decision.input().model.split('/')[0] === type;
};
