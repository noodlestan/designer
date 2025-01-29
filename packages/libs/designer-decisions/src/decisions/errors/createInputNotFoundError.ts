import type { DecisionNotFoundError } from '../../types';

type Attributes = Omit<DecisionNotFoundError, 'message'>;

export function createInputNotFoundError(attributes: Attributes): DecisionNotFoundError {
    const { ref } = attributes;

    const message = () => {
        const refStr = JSON.stringify(ref);
        return `Ref ${refStr} not found.`;
    };

    return {
        ...attributes,
        message,
    };
}
