import type { DecisionValueRefMismatchError } from '../../types';

type Attributes = Omit<DecisionValueRefMismatchError, 'message'>;

export const createRefMismatchError = (attributes: Attributes): DecisionValueRefMismatchError => {
    const { context, valueName, ref, decision, accepted } = attributes;

    const message = () => {
        const refStr = JSON.stringify(ref);
        const decisionRefStr = JSON.stringify(context.decisionContext().ref());
        const referenced = `referenced in "${decisionRefStr}"`;
        const actual = decision.type();
        const mismatch = `matched "${actual}", expected ${accepted.join(', ')}`;
        return `Ref (${valueName}) ${refStr} ${referenced} ${mismatch}.`;
    };

    return {
        ...attributes,
        message,
    };
};
