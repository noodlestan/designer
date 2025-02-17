import type { DecisionValueInputError } from '../types';

type Attributes = Omit<DecisionValueInputError, 'message'>;

export const createInvalidInputError = (attributes: Attributes): DecisionValueInputError => {
    const { context, valueName, input, error: err } = attributes;

    const message = () => {
        const dataStr = JSON.stringify(input);
        const refStr = JSON.stringify(context.decisionContext().ref());
        const errStr = err
            ? ` Error: "${err instanceof Error ? err.stack : JSON.stringify(err)}"`
            : '';
        return `Invalid input data for a ${valueName} in ${refStr}: ${dataStr}${errStr}.`;
    };

    return {
        ...attributes,
        message,
    };
};
