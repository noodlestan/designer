import type { DecisionRef, DecisionValueError, ValueContext } from '../../types';

type Attributes = {
    context: ValueContext;
    name: string;
    ref: DecisionRef;
};

export function createRefNotFoundError(attributes: Attributes): DecisionValueError {
    const { context, name, ref } = attributes;

    const refStr = JSON.stringify(ref);
    const decisionRefStr = JSON.stringify(context.decisionContext().ref());
    const referenced = `referenced in "${decisionRefStr}"`;
    const msg = `Ref (${name}) ${refStr} not found, ${referenced}.`;
    return {
        msg,
    };
}
