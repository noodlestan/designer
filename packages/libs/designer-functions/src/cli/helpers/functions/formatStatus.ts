import type { ProducedDecisionStatus } from '../types';

export const formatStatus = (status: ProducedDecisionStatus, useColor: boolean): string => {
    const { hasErrors } = status;
    if (hasErrors) {
        return useColor ? '🟥' : '!';
    }
    return useColor ? '🟩' : '-';
};
