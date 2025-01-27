import type {
    BaseValue,
    Decision,
    DecisionContext,
    DecisionRef,
    DecisionRefResolver,
    LookupContexts,
    StaticInputMap,
    ValueContext,
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
    decision: <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
        contexts?: LookupContexts,
    ) => [DecisionContext, Decision<V> | undefined];
    resolver: DecisionRefResolver;
    createDecisionContext: (contexts?: LookupContexts) => DecisionContext;
    createValueContext: (lookupContexts?: LookupContexts) => ValueContext;
};
