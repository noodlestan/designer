import type {
    Decision,
    DecisionContext,
    DecisionContexts,
    DecisionInputBase,
    DecisionRef,
} from '../../types';
import { createDecisionContext, createStaticStoreDecision } from '../functions';
import type { StaticDecisionMap, StaticInputMap } from '../types';

export const createDecisionFactory = (inputStore: StaticInputMap): StaticDecisionMap => {
    const _createDecision = (context: DecisionContext, input: DecisionInputBase) => {
        return createStaticStoreDecision(context, input);
    };

    const _resolver = <D = unknown>(
        parent: DecisionContext,
        ref: DecisionRef,
    ): Decision<D> | undefined => {
        const input = inputStore.record(ref, parent.contexts);
        if (input) {
            const context = createDecisionContext(input, parent.contexts, _resolver);
            const decision = _createDecision(context, input);
            return decision as Decision<D>;
        }
    };

    const create = <D = unknown>(
        input: DecisionInputBase,
        contexts?: DecisionContexts,
    ): Decision<D> | undefined => {
        const context = createDecisionContext(input, contexts, _resolver);
        return _createDecision(context, input) as Decision<D>;
    };

    return {
        create,
        resolve: _resolver,
    };
};
