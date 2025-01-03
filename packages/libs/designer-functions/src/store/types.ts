import type {
    Decision,
    DecisionContext,
    DecisionRef,
    DecisionRefResolver,
    LookupContexts,
    StaticInputMap,
} from '@noodlestan/designer-decisions';

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
        contexts?: LookupContexts,
    ) => [DecisionContext, Decision<V> | undefined];
    resolver: DecisionRefResolver;
};
