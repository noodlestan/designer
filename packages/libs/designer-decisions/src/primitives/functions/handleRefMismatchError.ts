import type { DecisionUnknown } from '../../decisions';
import type { DecisionRef } from '../../inputs';
import { type ValueContext, createValueRefMismatchError } from '../../values';

export const handleRefMismatchError = (
    context: ValueContext,
    decision: DecisionUnknown,
    name: string,
    ref: DecisionRef,
    accepted: string[],
): void => {
    const error = createValueRefMismatchError({
        context,
        decision,
        valueName: name,
        ref,
        accepted,
    });
    context.addError(error);
};
