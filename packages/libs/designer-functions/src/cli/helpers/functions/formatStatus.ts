import type { ProducedDecisionStatus } from '../types';

export const formatStatus = (status: ProducedDecisionStatus, useColor: boolean): string => {
    const { hasDecisionErrors, hasValueErrors } = status;
    if (hasDecisionErrors) {
        return useColor ? '🟥' : 'X';
    }
    if (hasValueErrors) {
        return useColor ? '🟨' : '!';
    }
    return useColor ? '🟩' : '-';
};
