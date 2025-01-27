import type { DecisionContext, DecisionError, DecisionRef } from '../../types';

type Attributes = {
    context: DecisionContext;
    ref: DecisionRef;
};

export function createInputNotFoundError(attributes: Attributes): DecisionError {
    const { ref } = attributes;

    const refStr = JSON.stringify(ref);
    const msg = `Ref ${refStr} not found.`;
    return {
        msg,
    };
}
