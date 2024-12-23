import type { ErrorObject } from 'ajv';

import type { Decision, DecisionContexts, DecisionInputBase, DecisionRef } from '../types';

import { createDecisionFactory } from './parts';
import type { StaticDecisionStore, StaticInputMap } from './types';

export type DecisionInputData = {
    decision: DecisionInputBase;
    errors: ErrorObject[] | null | undefined;
};

export const createStaticDecisionStore = (inputStore: StaticInputMap): StaticDecisionStore => {
    const decisions = createDecisionFactory(inputStore);

    const decision = <D = unknown>(
        ref: DecisionRef,
        contexts: DecisionContexts = { all: [] },
    ): Decision<D> | undefined => {
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
