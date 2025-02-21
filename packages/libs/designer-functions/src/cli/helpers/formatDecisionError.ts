import {
    type DecisionError,
    type DecisionInputError,
    serializeMaybeError,
} from '@noodlestan/designer-decisions';

import { formatDecisionInputError } from './formatDecisionInputError';

export const formatDecisionError = (
    error: DecisionError | DecisionInputError,
    useColor: boolean = true,
    showErrorSources: boolean = false,
    name?: string | false,
): string => {
    const isValidationError = 'source' in error;
    if (isValidationError) {
        return formatDecisionInputError(error, useColor, showErrorSources, Boolean(name));
    }

    const symbol = useColor ? '🟥' : 'X';
    const prefix = name ? `Decision "${name}" ` : '';

    const isUnexpectedError = 'error' in error;
    const errStr = isUnexpectedError
        ? serializeMaybeError(error.error, ' Reason: {}')
        : error.message();

    return `${symbol} ${prefix}${errStr}`;
};
