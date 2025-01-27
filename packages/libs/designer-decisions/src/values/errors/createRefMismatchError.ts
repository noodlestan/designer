import type { DecisionRef, DecisionUnknown, DecisionValueError, ValueContext } from '../../types';

type Attributes = {
    context: ValueContext;
    name: string;
    ref: DecisionRef;
    decision: DecisionUnknown;
    accepted: string[];
};

export const createRefMismatchError = (attributes: Attributes): DecisionValueError => {
    const { context, ref, name, decision, accepted } = attributes;

    const refStr = JSON.stringify(ref);
    const decisionRefStr = JSON.stringify(context.decisionContext().ref());
    const referenced = `referenced in "${decisionRefStr}"`;
    const actual = decision.type();
    const mismatch = `matched "${actual}", expected ${accepted.join(', ')}`;
    const msg = `Ref (${name}) ${refStr} ${referenced} ${mismatch}.`;
    return {
        msg,
    };
};
