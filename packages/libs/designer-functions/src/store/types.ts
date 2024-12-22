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
    allErrors: () => DecisionError[] | null;
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

export type StaticDecisionStore = {
    hasErrors: StaticInputMap['hasErrors'];
    allErrors: StaticInputMap['allErrors'];
    records: StaticInputMap['records'];
    record: StaticInputMap['record'];
    decision: <V = unknown>(
        ref: DecisionRef,
        contexts?: DecisionContexts,
    ) => Decision<V> | undefined;
};
