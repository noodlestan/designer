import type { DecisionRef, DecisionValueError, ValueContext } from '../../types';

type Attributes = {
    context: ValueContext;
    name: string;
    ref: DecisionRef;
};

export const createRefIndexError = (attributes: Attributes): DecisionValueError => {
    const { context, ref, name } = attributes;

    context.decisionContext().ref();

    const refStr = JSON.stringify(ref);
    const decisionRefStr = JSON.stringify(context.decisionContext().ref());
    const referenced = `referenced in "${decisionRefStr}"`;
    const msg = `Ref (${name}) ${refStr} out of bounds ${referenced}.`;
    return {
        msg,
    };
};
