import type { DecisionError } from '../types';

export const formatValidationError = (error: DecisionError): string => {
    return `🟨 Decision ${error.decision.name} ${error.error.instancePath} (${error.error.keyword}) ${error.error.message}`;
};
