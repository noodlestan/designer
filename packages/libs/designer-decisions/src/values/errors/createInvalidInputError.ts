import type { DecisionValueContext, DecisionValueError } from '../../types';

export const createInvalidInputError = (
    context: DecisionValueContext,
    valueName: string,
    data: unknown,
    err?: unknown,
): DecisionValueError => {
    const dataStr = ` ${JSON.stringify(data)}`;
    const ref = context.decisionContext().ref();
    const inRef = `in "${'$name' in ref ? ref.$name : ref.$uuid}"`; // WIP stringify ref
    const errStr = err && ` Error: "${err instanceof Error ? err.stack : JSON.stringify(err)}"`;
    const msg = `Invalid input data for a ${valueName} ${inRef}: ${dataStr}${errStr}.`;
    return {
        msg,
    };
};
