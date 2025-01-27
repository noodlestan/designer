import type { DecisionValueError, ValueContext } from '../../types';

type Attributes = {
    context: ValueContext;
    name: string;
    input: unknown;
    error?: unknown;
};

export const createInvalidInputError = (attributes: Attributes): DecisionValueError => {
    const { context, name, input, error: err } = attributes;

    const dataStr = JSON.stringify(input);
    const refStr = JSON.stringify(context.decisionContext().ref());
    const errStr = err ? ` Error: "${err instanceof Error ? err.stack : JSON.stringify(err)}"` : '';
    const msg = `Invalid input data for a ${name} in ${refStr}: ${dataStr}${errStr}.`;
    return {
        msg,
    };
};
