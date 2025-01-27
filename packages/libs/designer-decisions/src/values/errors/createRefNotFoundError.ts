import type { DecisionRef, DecisionValueError, ValueContext } from '../../types';

export function createRefNotFoundError(
    context: ValueContext,
    valueName: string,
    ref: DecisionRef,
): DecisionValueError {
    const refStr = JSON.stringify(ref);
    const decisionRefStr = JSON.stringify(context.decisionContext().ref());
    const referenced = `referenced in "${decisionRefStr}"`;
    const msg = `Ref (${valueName}) ${refStr} not found, ${referenced}.`;
    return {
        msg,
    };
}
