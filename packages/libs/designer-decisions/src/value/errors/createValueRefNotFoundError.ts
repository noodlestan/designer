import type { ValueRefNotFoundError } from '../types';

type Attributes = Omit<ValueRefNotFoundError, 'message'>;

export function createValueRefNotFoundError(attributes: Attributes): ValueRefNotFoundError {
    const { context, valueName, ref } = attributes;

    const message = () => {
        const refStr = JSON.stringify(ref);
        const decisionRefStr = JSON.stringify(context.decisionContext().ref());
        const referenced = `referenced in "${decisionRefStr}"`;
        return `Ref (${valueName}) ${refStr} not found, ${referenced}.`;
    };

    return {
        ...attributes,
        message,
    };
}
