import type {
    Decision,
    DecisionContexts,
    DecisionInputBase,
    DecisionRef,
} from '@noodlestan/designer-decisions';
import type { ErrorObject } from 'ajv';

import { createDecisionFactory } from './parts';
import type { StaticDecisionStore, StaticDecisionStoreError, StaticInputMap } from './types';

export type DecisionInputData = {
    decision: DecisionInputBase;
    errors: ErrorObject[] | null | undefined;
};

export const createStaticDecisionStore = (
    inputStore: StaticInputMap,
    errors: StaticDecisionStoreError[] = [],
): StaticDecisionStore => {
    const decisions = createDecisionFactory(inputStore);

    const decision = <V = unknown>(
        ref: DecisionRef,
        contexts: DecisionContexts = { all: [] },
    ): Decision<V> | undefined => {
        const input = inputStore.record(ref, contexts);
        if (input) {
            return decisions.create(input, contexts);
        }
    };

    return {
        hasErrors: () => errors.length > 0 || inputStore.hasErrors(),
        storeErrors: () => errors,
        validationErrors: inputStore.validationErrors,
        records: inputStore.records,
        record: inputStore.record,
        decision,
    };
};
