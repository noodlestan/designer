import type { DecisionUnknown } from '../decision';
import type { DecisionInput } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { ModelContext } from '../model';
import type { ValidatedRecord } from '../record';
import { type ParentValueContext, createValueContext } from '../value';

import { createDecisionContextMock } from './createDecisionContextMock';
import { decisionTypeFromModel } from './functions';

export const createDecisionMockImplementation = (
    inputs: DecisionInput[],
    mockMethods: Record<string, () => unknown> = {},
) => {
    const type = decisionTypeFromModel(inputs[0] ? inputs[0].model : 'unknown/unknown');

    const decisionContext = createDecisionContextMock(inputs);

    return (modelContext: ModelContext): DecisionUnknown => {
        const produce = (context?: LookupContexts | ParentValueContext) => {
            const valueContext = createValueContext(modelContext, inputs[0], context);
            return {
                type: () => type,
                context: () => valueContext,
                get: mockMethods.get,
                ...mockMethods,
            };
        };

        return {
            context: () => decisionContext[0],
            uuid: () => inputs[0]?.uuid,
            type: () => type,
            name: () => inputs[0]?.name,
            description: () => inputs[0]?.description,
            records: () => inputs.map(input => ({ input }) as ValidatedRecord),
            model: () => inputs[0]?.model,
            params: () => inputs[0]?.params,
            produce,
        };
    };
};
