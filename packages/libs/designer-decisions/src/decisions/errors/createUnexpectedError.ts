import type { DecisionContext, DecisionError } from '../../types';

export const createUnexpectedError = (context: DecisionContext, err?: unknown): DecisionError => {
    const ref = context.ref();
    const refStr = JSON.stringify(ref);
    const errStr = err && err instanceof Error ? err.stack : JSON.stringify(err);
    const msg = `Unexpected error in ${refStr}: ${errStr}.`;
    return {
        msg,
    };
};
