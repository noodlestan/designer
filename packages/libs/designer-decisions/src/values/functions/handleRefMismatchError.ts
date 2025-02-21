import type { DecisionUnknown } from '../../decision';
import type { DecisionRef } from '../../inputs';
import { type ValueContext, createValueRefMismatchError } from '../../value';

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
