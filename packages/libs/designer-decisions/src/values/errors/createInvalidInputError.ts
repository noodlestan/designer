import type { DecisionValueContext, DecisionValueError } from '../../types';

export const createInvalidInputError = (
    context: DecisionValueContext,
    valueName: string,
    data: unknown,
    err?: unknown,
): DecisionValueError => {
    const dataStr = ` ${JSON.stringify(data)}`;
    const owner = `in "${context.owner.name}`;
    const errStr = err && ` Error: "${err instanceof Error ? err.stack : JSON.stringify(err)}"`;
    const msg = `Invalid input data for a ${valueName} ${owner}: ${dataStr}${errStr}.`;
    return {
        msg,
    };
};
