import type {
    DecisionContext,
    DecisionContexts,
    DecisionInputBase,
    DecisionRefResolver,
} from '../../types';

export const createDecisionContext = (
    owner: DecisionInputBase,
    contexts: DecisionContexts = { all: [] },
    resolver: DecisionRefResolver,
): DecisionContext => {
    return { owner, contexts, resolve: resolver };
};
