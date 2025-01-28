import type { DecisionRef, ValueContext } from '../../types';
import { createRefNotFoundError } from '../../values';

export const handleDecisionNotFound = (
    context: ValueContext,
    name: string,
    ref: DecisionRef,
): void => {
    const error = createRefNotFoundError({ context, valueName: name, ref });
    context.addError(error);
};
