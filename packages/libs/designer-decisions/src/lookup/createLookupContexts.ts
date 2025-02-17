import type { DecisionContextsInput } from '../inputs';

import type { LookupContexts } from './types';

export const createLookupContexts = (contexts?: DecisionContextsInput): LookupContexts => {
    const { all, any } = Array.isArray(contexts) ? { all: contexts } : contexts || { all: [] };

    return {
        all,
        any,
    };
};
