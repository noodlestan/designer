import type { Decision, DecisionContext, DecisionInputBase, ParentValueContext } from '../types';
import { createDecisionValueContext } from '../values';

import { getDecisionModelFactory } from '.';

export const createStaticStoreDecision = <V = unknown>(
    context: DecisionContext,
    input: DecisionInputBase,
): Decision<V> => {
    const modelFactory = getDecisionModelFactory<V>(input.model);
    const model = modelFactory();

    const produce = (parentContext?: ParentValueContext) => {
        const valueContext = parentContext
            ? parentContext.createChildContext()
            : createDecisionValueContext(context);
        return model.produce(valueContext, input.params);
    };

    const api: Decision<V> = {
        input: () => input,
        produce,
    };

    return api;
};
