import type { DecisionValidationError } from '../../types';

type Attributes = Omit<DecisionValidationError, 'message'>;

export const createValidationError = (attributes: Attributes): DecisionValidationError => {
    const { context, error } = attributes;

    const message = () => {
        const ref = context.ref();
        const refStr = JSON.stringify(ref);
        const errStr = error && error instanceof Error ? error.message : JSON.stringify(error);
        return `Validation error in ${refStr}: ${errStr}.`;
    };

    return {
        ...attributes,
        message,
    };
};
