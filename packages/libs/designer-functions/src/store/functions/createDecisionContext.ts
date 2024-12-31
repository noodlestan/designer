import type {
    DecisionContext,
    DecisionContexts,
    DecisionInputBase,
    DecisionRefResolver,
} from '@noodlestan/designer-decisions';

export const createDecisionContext = (
    resolver: DecisionRefResolver,
    owner: DecisionInputBase,
    contexts: DecisionContexts = { all: [] },
): DecisionContext => {
    return { owner, contexts, resolve: resolver };
};
