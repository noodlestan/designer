import type { DecisionRef, DecisionRefResolver, InputRecord } from '../inputs';

import type { DecisionContext, DecisionError } from './types';

export const createDecisionContext = (
    ref: DecisionRef,
    resolver: DecisionRefResolver,
    inputs: InputRecord[],
): DecisionContext => {
    const errors: DecisionError[] = [];

    const addError = (error: DecisionError) => {
        errors.push(error);
    };

    return {
        ref: () => ref,
        resolve: resolver,
        inputs: () => inputs,
        errors: () => errors,
        hasErrors: () => Boolean(errors.length),
        addError,
    };
};
