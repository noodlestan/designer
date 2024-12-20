import { createValueContext, getDecisionModelFactory } from '../../decision';
import type { Decision, DecisionContext, DecisionInputBase } from '../../types';

export const createStaticStoreDecision = <V = unknown>(
    context: DecisionContext,
    input: DecisionInputBase,
): Decision<V> => {
    const modelFactory = getDecisionModelFactory<V>(input.model);
    const model = modelFactory();

    const api: Decision<V> = {
        input: () => input,
        produce: valueContext =>
            model.produce(createValueContext(context, valueContext), input.params),
    };

    return api;
};
