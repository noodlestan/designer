import type { DecisionInputError } from '@noodlestan/designer-decisions';

export const formatValidationError = (error: DecisionInputError): string => {
    return `🟨 Decision "${error.decision.name}" ${error.error.instancePath} (${error.error.keyword}) ${error.error.message}`;
};
