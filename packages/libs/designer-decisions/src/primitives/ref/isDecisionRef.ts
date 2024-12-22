import type { DecisionRef } from '../../types';

export const isDecisionRef = (data: unknown): data is DecisionRef => {
    return typeof data === 'object' && data !== null && ('$name' in data || '$uuid' in data);
};
