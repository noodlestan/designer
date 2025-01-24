import type { DecisionContext, DecisionError } from '../../types';

export const createUnexpectedError = (context: DecisionContext, err?: unknown): DecisionError => {
    const ref = context.ref();
    const inRef = `in "${'$name' in ref ? ref.$name : ref.$uuid}"`; // WIP stringify ref
    const errStr = err && ` Error: "${err instanceof Error ? err.stack : JSON.stringify(err)}"`;
    const msg = `Unexpected error ${inRef}: ${errStr}.`;
    return {
        msg,
    };
};
