import type {
    DecisionContext,
    DecisionInputBase,
    DecisionUnknown,
    LookupContexts,
    ParentValueContext,
} from '../../types';
import { createDecisionValueContext } from '../../values';

export const createStaticStoreDecisionMockImplementation = (mockValue: string) => {
    return (decisionContext: DecisionContext, inputs: DecisionInputBase[]): DecisionUnknown => {
        const produce = (context?: LookupContexts | ParentValueContext) => {
            const valueContext = createDecisionValueContext(decisionContext, context, inputs[0]);
            return {
                context: () => valueContext,
                get: () => mockValue,
            };
        };

        return {
            uuid: () => inputs[0].uuid,
            type: () => inputs[0].model.split('/')[0],
            name: () => inputs[0].name,
            description: () => inputs[0].description,
            inputs: () => inputs,
            input: () => inputs[0],
            model: () => inputs[0].model,
            params: () => inputs[0].params,
            produce,
        };
    };
};
