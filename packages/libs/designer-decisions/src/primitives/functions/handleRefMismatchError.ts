import type { DecisionRef, DecisionUnknown, ValueContext } from '../../types';
import { createRefMismatchError } from '../../values';

export const handleRefMismatchError = (
    context: ValueContext,
    decision: DecisionUnknown,
    name: string,
    ref: DecisionRef,
    accepted: string[],
): void => {
    const error = createRefMismatchError({ context, decision, valueName: name, ref, accepted });
    context.addError(error);
};
