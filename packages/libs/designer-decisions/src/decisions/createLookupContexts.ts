import type { DecisionContextsInput, LookupContexts } from '../types';

export const createLookupContext = (contexts?: DecisionContextsInput): LookupContexts => {
    const { all, any } = Array.isArray(contexts) ? { all: contexts } : contexts || { all: [] };

    return {
        all,
        any,
    };
};
