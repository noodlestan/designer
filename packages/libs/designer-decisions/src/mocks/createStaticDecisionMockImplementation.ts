import type { DecisionContext, DecisionUnknown } from '../decision';
import type { DecisionInput } from '../inputs';
import type { LookupContexts } from '../lookup';
import { type ParentValueContext, createValueContext } from '../value';

import { decisionTypeFromModel } from './functions';

export const createStaticDecisionMockImplementation = (
    mockMethods: Record<string, () => unknown> = {},
    inputs: DecisionInput[],
) => {
    const type = decisionTypeFromModel(inputs[0] ? inputs[0].model : 'unknown/unknown');

    return (decisionContext: DecisionContext): DecisionUnknown => {
        const produce = (context?: LookupContexts | ParentValueContext) => {
            const valueContext = createValueContext(decisionContext, context, inputs[0]);
            return {
                type: () => type,
                context: () => valueContext,
                get: mockMethods.get,
                ...mockMethods,
            };
        };

        return {
            uuid: () => inputs[0].uuid,
            type: () => type,
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
