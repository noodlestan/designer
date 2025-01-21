import type {
    Decision,
    DecisionContext,
    DecisionInputBase,
    DecisionRef,
    LookupContexts,
    StaticInputMap,
} from '@noodlestan/designer-decisions';
import {
    createDecisionContext,
    createDecisionFactory,
    createInputNotFoundError,
} from '@noodlestan/designer-decisions';
import type { ErrorObject } from 'ajv';

import { createInputSub } from './functions';
import type { StaticDecisionStore, StaticDecisionStoreError } from './types';

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
        contexts: LookupContexts = { all: [] },
    ): [DecisionContext, Decision<V> | undefined] => {
        const input = inputStore.record(ref, contexts);
        if (input) {
            return decisions.create(input, contexts);
        }
        const inputStub = createInputSub(ref);
        const context = createDecisionContext(decisions.resolve, inputStub, contexts);
        const error = createInputNotFoundError(context, ref);
        context.addError(error);
        return [context, undefined];
    };

    const createContext = (contexts: LookupContexts = { all: [] }) => {
        return createDecisionContext(decisions.resolve, createInputSub(), contexts);
    };

    return {
        hasErrors: () => errors.length > 0 || inputStore.hasErrors(),
        storeErrors: () => errors,
        validationErrors: inputStore.validationErrors,
        records: inputStore.records,
        record: inputStore.record,
        decision,
        resolver: decisions.resolve,
        createDecisionContext: createContext,
    };
};
