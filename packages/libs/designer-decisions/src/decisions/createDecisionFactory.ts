import type { StaticDecisionMap, StaticInputMap } from '../inputs';
import type {
    Decision,
    DecisionContext,
    LookupContexts,
    DecisionInputBase,
    DecisionRef,
} from '../types';

import { createDecisionContext, createStaticStoreDecision, createUnexpectedError } from '.';

export const createDecisionFactory = (inputStore: StaticInputMap): StaticDecisionMap => {
    const _createDecision = (context: DecisionContext, input: DecisionInputBase) => {
        try {
            return createStaticStoreDecision(context, input);
        } catch (error) {
            const err = createUnexpectedError(context, error);
            context.addError(err);
        }
    };

    const _resolver = <V = unknown>(
        parent: DecisionContext,
        ref: DecisionRef,
    ): Decision<V> | undefined => {
        const input = inputStore.record(ref, parent.contexts());
        if (input) {
            const context = createDecisionContext(_resolver, input, parent.contexts());
            const decision = _createDecision(context, input);
            return decision as Decision<V>;
        }
    };

    const create = <V = unknown>(
        input: DecisionInputBase,
        contexts?: LookupContexts,
    ): [DecisionContext, Decision<V> | undefined] => {
        const context = createDecisionContext(_resolver, input, contexts);
        return [context, _createDecision(context, input) as Decision<V>];
    };

    return {
        create,
        resolve: _resolver,
    };
};
