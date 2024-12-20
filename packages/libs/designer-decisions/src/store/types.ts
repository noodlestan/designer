import type { DecisionInputBase } from '../types';
import type { DecisionError } from '../types/decision-inputs/validation/types';
import type {
    Decision,
    DecisionContexts,
    DecisionRef,
    DecisionRefResolver,
} from '../types/decision-values/base';

export type StaticInputMap = {
    hasErrors: () => boolean;
    allErrors: () => DecisionError[] | null;
    records: (filter?: (item: DecisionInputBase) => boolean) => DecisionInputBase[];
    record: (ref: DecisionRef, contexts?: DecisionContexts) => DecisionInputBase | undefined;
};

export type StaticDecisionMap = {
    create: <D = unknown>(
        input: DecisionInputBase,
        contexts?: DecisionContexts,
    ) => Decision<D> | undefined;
    resolve: DecisionRefResolver;
};

export type StaticDecisionStore = {
    hasErrors: StaticInputMap['hasErrors'];
    allErrors: StaticInputMap['allErrors'];
    records: StaticInputMap['records'];
    record: StaticInputMap['record'];
    decision: <D = unknown>(
        ref: DecisionRef,
        contexts?: DecisionContexts,
    ) => Decision<D> | undefined;
};
