import type {
    BaseValue,
    Decision,
    DecisionContext,
    DecisionInputBase,
    LookupContexts,
    ParentValueContext,
} from '../types';
import { createDecisionValueContext } from '../values';

import { getDecisionModelFactory } from './getDecisionModelFactory';

export const createStaticStoreDecision = <T = unknown>(
    decisionContext: DecisionContext,
    inputs: DecisionInputBase[],
): Decision<BaseValue<T>> => {
    const produce = (context?: LookupContexts | ParentValueContext): BaseValue<T> => {
        const input = inputs[0]; // WIP match context
        const modelFactory = getDecisionModelFactory<T>(input.model);
        const model = modelFactory();

        const valueContext = createDecisionValueContext(decisionContext, context, input);
        return model.produce(valueContext, input.params) as BaseValue<T>;
    };

    const api: Decision<BaseValue<T>> = {
        uuid: () => inputs[0].uuid,
        type: () => inputs[0].model.split('/')[0],
        name: () => inputs[0].name,
        description: () => inputs[0].description,
        inputs: () => inputs,
        input: () => inputs[0], // WIP match context
        model: () => inputs[0].model, // WIP match context
        params: () => inputs[0].params, // WIP match context
        produce,
    };

    return api;
};
