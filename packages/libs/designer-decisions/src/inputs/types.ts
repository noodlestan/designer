import type {
    Decision,
    DecisionContext,
    DecisionInputBase,
    DecisionInputError,
    DecisionRef,
    DecisionRefResolver,
    LookupContexts,
} from '../types';

export type StaticInputMap = {
    hasErrors: () => boolean;
    validationErrors: () => DecisionInputError[];
    records: (filter?: (item: DecisionInputBase) => boolean) => DecisionInputBase[];
    record: (ref: DecisionRef, contexts?: LookupContexts) => DecisionInputBase | undefined;
};

export type StaticDecisionMap = {
    create: <V = unknown>(
        input: DecisionInputBase,
        contexts?: LookupContexts,
    ) => [DecisionContext, Decision<V> | undefined];
    resolve: DecisionRefResolver;
};
