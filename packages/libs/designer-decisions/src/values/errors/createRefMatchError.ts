import type {
    DecisionRef,
    DecisionUnknown,
    DecisionValueContext,
    DecisionValueError,
} from '../../types';

export const createRefMatchError = (
    context: DecisionValueContext,
    valueName: string,
    ref: DecisionRef,
    decision: DecisionUnknown,
    accepted: string[],
): DecisionValueError => {
    const refStr = JSON.stringify(ref);
    const decisionRefStr = JSON.stringify(context.decisionContext().ref());
    const referenced = `referenced in "${decisionRefStr}"`;
    const actual = decision.type();
    const mismatch = `matched "${actual}", expected ${accepted.join(', ')}`;
    const msg = `Ref (${valueName}) ${refStr} ${referenced} ${mismatch}.`;
    return {
        msg,
    };
};
