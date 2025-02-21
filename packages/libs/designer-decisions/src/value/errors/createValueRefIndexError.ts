import type { ValueRefIndexError } from '../types';

type Attributes = Omit<ValueRefIndexError, 'message'>;

export const createValueRefIndexError = (attributes: Attributes): ValueRefIndexError => {
    const { context, valueName, ref } = attributes;

    context.decisionContext().ref();

    const message = () => {
        const refStr = JSON.stringify(ref);
        const decisionRefStr = JSON.stringify(context.decisionContext().ref());
        const referenced = `referenced in "${decisionRefStr}"`;
        return `Ref (${valueName}) ${refStr} out of bounds ${referenced}.`;
    };

    return {
        ...attributes,
        message,
    };
};
