import type { DecisionUnknown } from '../decision';
import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';
import type { LookupContexts } from '../lookup';
import { type ParentValueContext, createValueContext } from '../value';

import { decisionTypeFromModel } from './functions';

export const createDecisionMockImplementation = (
    inputs: DecisionInput[],
    mockMethods: Record<string, () => unknown> = {},
) => {
    const type = decisionTypeFromModel(inputs[0] ? inputs[0].model : 'unknown/unknown');

    return (decisionContext: DecisionContext): DecisionUnknown => {
        const produce = (context?: LookupContexts | ParentValueContext) => {
            const valueContext = createValueContext(decisionContext, inputs[0], context);
            return {
                type: () => type,
                context: () => valueContext,
                get: mockMethods.get,
                ...mockMethods,
            };
        };

        return {
            context: () => decisionContext,
            uuid: () => inputs[0]?.uuid,
            type: () => type,
            name: () => inputs[0]?.name,
            description: () => inputs[0]?.description,
            inputs: () => inputs,
            model: () => inputs[0]?.model,
            params: () => inputs[0]?.params,
            produce,
        };
    };
};
