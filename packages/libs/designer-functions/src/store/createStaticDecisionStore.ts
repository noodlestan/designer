import type {
    BaseValue,
    Decision,
    DecisionContext,
    DecisionRef,
    LookupContexts,
    StaticInputMap,
} from '@noodlestan/designer-decisions';
import {
    createDecisionContext,
    createStaticDecisionMap,
    createValueContext,
} from '@noodlestan/designer-decisions';

import type { StaticDecisionStore, StaticDecisionStoreError } from './types';

export const createStaticDecisionStore = (
    inputStore: StaticInputMap,
    errors: StaticDecisionStoreError[] = [],
): StaticDecisionStore => {
    const decisionMap = createStaticDecisionMap(inputStore);

    const decision = <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
    ): [DecisionContext, Decision<V> | undefined] => {
        return decisionMap.resolve(ref);
    };

    const _createDecisionContext = () => {
        return createDecisionContext({ $name: '<unknown>' }, decisionMap.resolve, []); // WIP
    };

    const _createValueContext = (lookupContexts?: LookupContexts) => {
        const decisionContext = _createDecisionContext();
        return createValueContext(decisionContext, lookupContexts);
    };

    return {
        hasErrors: () => errors.length > 0 || inputStore.hasErrors(),
        storeErrors: () => errors,
        validationErrors: inputStore.validationErrors,
        records: inputStore.records,
        decision,
        resolver: decisionMap.resolve,
        createDecisionContext: _createDecisionContext,
        createValueContext: _createValueContext,
    };
};
