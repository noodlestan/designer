import type { ProducedDecisionStatus } from '../types';

export const countErrors = (status: ProducedDecisionStatus): string => {
    const { context, value } = status;

    const decisionErrors = context.errors();
    const valueErrors = value?.context().errors() || [];

    const count = Math.max(decisionErrors.length, valueErrors.length);
    return count === 1 ? `${count} error` : `${count} errors`;
};
