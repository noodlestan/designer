import type {
    BaseValue,
    Decision,
    DecisionContext,
    DecisionRef,
    LookupContexts,
    StaticValidatedMap,
} from '@noodlestan/designer-decisions';
import { createDecisionContext, createValueContext } from '@noodlestan/designer-decisions';

import type { Store, StoreContext } from '../types';

import { createStaticResolver } from './private';

export const createStaticStore = (
    context: StoreContext,
    validatedMap: StaticValidatedMap,
): Store => {
    const resolver = createStaticResolver(validatedMap);

    const decision = <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
    ): [DecisionContext, Decision<V> | undefined] => {
        return resolver.resolve(ref);
    };

    const _createDecisionContext = () => {
        return createDecisionContext({ $name: '<unknown>' }, resolver.resolve, []); // WIP
    };

    const _createValueContext = (lookupContexts?: LookupContexts) => {
        const decisionContext = _createDecisionContext();
        return createValueContext(decisionContext, lookupContexts);
    };

    return {
        context: () => context,
        inputErrors: validatedMap.inputErrors,
        records: validatedMap.records,
        decision,
        createDecisionContext: _createDecisionContext,
        createValueContext: _createValueContext,
    };
};
