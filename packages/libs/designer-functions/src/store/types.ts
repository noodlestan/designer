import type {
    Decision,
    DecisionContexts,
    DecisionError,
    DecisionInputBase,
    DecisionRef,
    DecisionRefResolver,
} from '@noodlestan/designer-decisions';

export type StaticInputMap = {
    hasErrors: () => boolean;
    validationErrors: () => DecisionError[];
    records: (filter?: (item: DecisionInputBase) => boolean) => DecisionInputBase[];
    record: (ref: DecisionRef, contexts?: DecisionContexts) => DecisionInputBase | undefined;
};

export type StaticDecisionMap = {
    create: <V = unknown>(
        input: DecisionInputBase,
        contexts?: DecisionContexts,
    ) => Decision<V> | undefined;
    resolve: DecisionRefResolver;
};

export type StaticDecisionStoreError = {
    msg: string;
    error: Error;
};

export type StaticDecisionStore = {
    hasErrors: StaticInputMap['hasErrors'];
    storeErrors: () => StaticDecisionStoreError[];
    validationErrors: StaticInputMap['validationErrors'];
    records: StaticInputMap['records'];
    record: StaticInputMap['record'];
    decision: <V = unknown>(
        ref: DecisionRef,
        contexts?: DecisionContexts,
    ) => Decision<V> | undefined;
};
