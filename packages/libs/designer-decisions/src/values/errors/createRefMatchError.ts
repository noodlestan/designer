import type { Decision, DecisionRef, DecisionValueContext, DecisionValueError } from '../../types';

export const createRefMatchError = (
    context: DecisionValueContext,
    valueName: string,
    ref: DecisionRef,
    decision: Decision<unknown>,
    accepted: string[],
): DecisionValueError => {
    const refStr = JSON.stringify(ref);
    const referenced = ` referenced in "${context.input.name}`;
    const actual = decision.model();
    const mismatch = ` matched "${actual}", expected one of [${accepted.join(', ')}]`;
    const msg = `Ref (${valueName}) ${refStr} ${referenced} ${mismatch}.`;
    return {
        msg,
    };
};
