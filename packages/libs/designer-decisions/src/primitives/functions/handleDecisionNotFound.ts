import type { DecisionRef } from '../../inputs';
import { type ValueContext, createRefNotFoundError } from '../../values';

export const handleDecisionNotFound = (
    context: ValueContext,
    name: string,
    ref: DecisionRef,
): void => {
    const error = createRefNotFoundError({ context, valueName: name, ref });
    context.addError(error);
};
