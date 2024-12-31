import type { DecisionRef, DecisionValueContext, DecisionValueError } from '../../types';

export function createRefNotFoundError(
    context: DecisionValueContext,
    valueName: string,
    ref: DecisionRef,
): DecisionValueError {
    const refStr = JSON.stringify(ref);
    const referenced = `referenced in "${context.owner.name}`;
    const msg = `Ref (${valueName}) ${refStr} not found ${referenced}.`;
    return {
        msg,
    };
}
