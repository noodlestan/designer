import type {
    DecisionContext,
    DecisionError,
    DecisionInputBase,
    DecisionRef,
    DecisionRefResolver,
} from '../types';

export const createDecisionContext = (
    ref: DecisionRef,
    resolver: DecisionRefResolver,
    inputs: DecisionInputBase[],
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
