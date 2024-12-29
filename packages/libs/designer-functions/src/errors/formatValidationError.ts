import type { DecisionError } from '@noodlestan/designer-decisions';

export const formatValidationError = (error: DecisionError): string => {
    return `🟨 Decision "${error.decision.name}" ${error.error.instancePath} (${error.error.keyword}) ${error.error.message}`;
};
