import type { DecisionRef } from '../../inputs';
import { createValueRefNotFoundError } from '../errors';
import { type ValueContext } from '../types';

export const handleDecisionNotFound = (
    context: ValueContext,
    name: string,
    ref: DecisionRef,
): void => {
    const error = createValueRefNotFoundError({ context, valueName: name, ref });
    context.addError(error);
};
