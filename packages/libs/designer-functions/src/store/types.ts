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

export type StoreError = {
    msg: string;
    error: Error;
};

export type StaticStore = {
    hasErrors: StaticInputMap['hasErrors'];
    storeErrors: () => StoreError[];
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
