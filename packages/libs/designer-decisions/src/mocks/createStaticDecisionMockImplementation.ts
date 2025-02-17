import type { DecisionContext, DecisionUnknown } from '../decisions';
import type { InputRecord } from '../inputs';
import type { LookupContexts } from '../lookup';
import { type ParentValueContext, createValueContext } from '../values';

export const createStaticDecisionMockImplementation = (
    mockMethods: Record<string, () => unknown> = {},
) => {
    return (decisionContext: DecisionContext, inputs: InputRecord[]): DecisionUnknown => {
        const produce = (context?: LookupContexts | ParentValueContext) => {
            const valueContext = createValueContext(decisionContext, context, inputs[0]);
            return {
                context: () => valueContext,
                get: mockMethods.get,
                ...mockMethods,
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
