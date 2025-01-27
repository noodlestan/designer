import type { DecisionValueError, ValueContext } from '../../types';

export const createInvalidInputError = (
    context: ValueContext,
    valueName: string,
    data: unknown,
    err?: unknown,
): DecisionValueError => {
    const dataStr = JSON.stringify(data);
    const refStr = JSON.stringify(context.decisionContext().ref());
    const errStr = err && ` Error: "${err instanceof Error ? err.stack : JSON.stringify(err)}"`;
    const msg = `Invalid input data for a ${valueName} in ${refStr}: ${dataStr}${errStr}.`;
    return {
        msg,
    };
};
