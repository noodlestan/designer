import type { DecisionUnexpectedError } from '../../types';

type Attributes = Omit<DecisionUnexpectedError, 'message'>;

export const createUnexpectedError = (attributes: Attributes): DecisionUnexpectedError => {
    const { context, error } = attributes;

    const message = () => {
        const ref = context.ref();
        const refStr = JSON.stringify(ref);
        const errStr = error && error instanceof Error ? error.stack : JSON.stringify(error);
        return `Unexpected error in ${refStr}: ${errStr}.`;
    };

    return {
        ...attributes,
        message,
    };
};
