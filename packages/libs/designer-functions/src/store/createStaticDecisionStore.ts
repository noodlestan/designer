import type {
    Decision,
    DecisionContexts,
    DecisionInputBase,
    DecisionRef,
} from '@noodlestan/designer-decisions';
import type { ErrorObject } from 'ajv';

import { createDecisionFactory } from './parts';
import type { StaticDecisionStore, StaticInputMap } from './types';

export type DecisionInputData = {
    decision: DecisionInputBase;
    errors: ErrorObject[] | null | undefined;
};

export const createStaticDecisionStore = (inputStore: StaticInputMap): StaticDecisionStore => {
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
        hasErrors: inputStore.hasErrors,
        allErrors: inputStore.allErrors,
        records: inputStore.records,
        record: inputStore.record,
        decision,
    };
};
