import type { DecisionValueRefNotFoundError } from '../types';

type Attributes = Omit<DecisionValueRefNotFoundError, 'message'>;

export function createRefNotFoundError(attributes: Attributes): DecisionValueRefNotFoundError {
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
