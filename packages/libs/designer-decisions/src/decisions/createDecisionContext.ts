import type {
    DecisionContext,
    DecisionError,
    DecisionInputBase,
    DecisionRefResolver,
    LookupContexts,
} from '../types';

export const createDecisionContext = (
    resolver: DecisionRefResolver,
    owner: DecisionInputBase,
    contexts: LookupContexts = { all: [] },
): DecisionContext => {
    const errors: DecisionError[] = [];

    const addError = (error: DecisionError) => {
        errors.push(error);
    };

    return {
        resolve: resolver,
        owner: () => owner,
        contexts: () => contexts,
        errors: () => errors,
        hasErrors: () => Boolean(errors.length),
        addError,
    };
};
