import type { DecisionError } from '@noodlestan/designer-decisions';

export const formatDecisionError = (name: string, error: DecisionError): string => {
    const { msg } = error;

    return `🟨 Decision "${name}" ${msg}`;
};
