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

import type { Store, StoreContext } from '../types';

export const createStaticStore = (context: StoreContext, inputStore: StaticInputMap): Store => {
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
        context: () => context,
        validationErrors: inputStore.validationErrors,
        records: inputStore.records,
        decision,
        resolver: decisionMap.resolve,
        createDecisionContext: _createDecisionContext,
        createValueContext: _createValueContext,
    };
};
