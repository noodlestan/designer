import type { DecisionContext, DecisionError, DecisionRef } from '../../types';

export function createInputNotFoundError(
    context: DecisionContext,
    ref: DecisionRef,
): DecisionError {
    const refStr = JSON.stringify(ref);
    const msg = `Ref ${refStr} not found.`;
    return {
        msg,
    };
}
