import type { ProducedDecisionStatus } from '../types';

export const countErrors = (status: ProducedDecisionStatus): string => {
    const { context, value } = status;

    const decisionErrors = context.errors();
    const valueWarnings = value?.context().errors() || [];

    const allErrors = [
        decisionErrors.length ? `${decisionErrors.length} errors` : '',
        valueWarnings.length ? `${valueWarnings.length} warnings` : '',
    ].filter(Boolean);
    return allErrors.join(', ');
};
