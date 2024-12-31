import type { DecisionContext, DecisionError } from '../../types';

export const createUnexpectedError = (context: DecisionContext, err?: unknown): DecisionError => {
    const owner = `in "${context.owner.name}`;
    const errStr = err && ` Error: "${err instanceof Error ? err.stack : JSON.stringify(err)}"`;
    const msg = `Unexpected error in ${owner}: ${errStr}.`;
    return {
        msg,
    };
};
