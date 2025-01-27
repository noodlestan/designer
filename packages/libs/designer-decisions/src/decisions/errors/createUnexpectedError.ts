import type { DecisionContext, DecisionError } from '../../types';

type Attributes = {
    context: DecisionContext;
    error?: unknown;
};

export const createUnexpectedError = (attributes: Attributes): DecisionError => {
    const { context, error } = attributes;

    const ref = context.ref();
    const refStr = JSON.stringify(ref);
    const errStr = error && error instanceof Error ? error.stack : JSON.stringify(error);
    const msg = `Unexpected error in ${refStr}: ${errStr}.`;
    return {
        msg,
    };
};
