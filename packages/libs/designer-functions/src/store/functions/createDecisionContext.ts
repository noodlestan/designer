import type {
    DecisionContext,
    DecisionContexts,
    DecisionInputBase,
    DecisionRefResolver,
} from '@noodlestan/designer-decisions';

export const createDecisionContext = (
    owner: DecisionInputBase,
    contexts: DecisionContexts = { all: [] },
    resolver: DecisionRefResolver,
): DecisionContext => {
    return { owner, contexts, resolve: resolver };
};
