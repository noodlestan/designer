import type {
    Decision,
    DecisionContext,
    DecisionContexts,
    DecisionInputBase,
    DecisionRef,
} from '@noodlestan/designer-decisions';

import { createDecisionContext, createStaticStoreDecision } from '../functions';
import type { StaticDecisionMap, StaticInputMap } from '../types';

export const createDecisionFactory = (inputStore: StaticInputMap): StaticDecisionMap => {
    const _createDecision = (context: DecisionContext, input: DecisionInputBase) => {
        return createStaticStoreDecision(context, input);
    };

    const _resolver = <V = unknown>(
        parent: DecisionContext,
        ref: DecisionRef,
    ): Decision<V> | undefined => {
        const input = inputStore.record(ref, parent.contexts);
        if (input) {
            const context = createDecisionContext(_resolver, input, parent.contexts);
            const decision = _createDecision(context, input);
            return decision as Decision<V>;
        }
    };

    const create = <V = unknown>(
        input: DecisionInputBase,
        contexts?: DecisionContexts,
    ): Decision<V> | undefined => {
        const context = createDecisionContext(_resolver, input, contexts);
        return _createDecision(context, input) as Decision<V>;
    };

    return {
        create,
        resolve: _resolver,
    };
};
