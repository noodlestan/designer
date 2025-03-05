import type { DecisionUnknown } from '../../decision';
import type { DecisionRef } from '../../inputs';
import { createValueRefMismatchError } from '../errors';
import { type ValueContext } from '../types';

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
