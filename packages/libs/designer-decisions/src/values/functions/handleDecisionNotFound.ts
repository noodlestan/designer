import type { DecisionRef } from '../../inputs';
import { type ValueContext, createValueRefNotFoundError } from '../../value';

export const handleDecisionNotFound = (
    context: ValueContext,
    name: string,
    ref: DecisionRef,
): void => {
    const error = createValueRefNotFoundError({ context, valueName: name, ref });
    context.addError(error);
};
