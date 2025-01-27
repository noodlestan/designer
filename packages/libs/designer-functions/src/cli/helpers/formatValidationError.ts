import type { InputValidationError } from '@noodlestan/designer-decisions';

export const formatValidationError = (error: InputValidationError): string => {
    return `🟨 Decision "${error.decision.name}" ${error.error.instancePath} (${error.error.keyword}) ${error.error.message}`;
};
