import { createValueContext } from '@noodlestan/designer-decisions';
import type {
    Decision,
    DecisionContext,
    DecisionInputBase,
    ParentValueContext,
} from '@noodlestan/designer-decisions';

import { getDecisionModelFactory } from '../../factories';

export const createStaticStoreDecision = <V = unknown>(
    context: DecisionContext,
    input: DecisionInputBase,
): Decision<V> => {
    const modelFactory = getDecisionModelFactory<V>(input.model);
    const model = modelFactory();

    const produce = (parentContext?: ParentValueContext) => {
        const valueContext = createValueContext(context, parentContext);
        return model.produce(valueContext, input.params);
    };

    const api: Decision<V> = {
        input: () => input,
        produce,
    };

    return api;
};
