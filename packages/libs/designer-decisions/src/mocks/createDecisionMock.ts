import type { Decision } from '../decision';
import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';
import type { BaseValue } from '../values';

import { createDecisionContextMock } from './createDecisionContextMock';
import { createDecisionMockImplementation } from './createDecisionMockImplementation';
import { createModelContextMock } from './createModelContextMock';

export const createDecisionMock = <T extends BaseValue<unknown> = BaseValue<unknown>>(
    inputs: DecisionInput[],
    mockMethods: Record<string, () => unknown> = {},
): [DecisionContext, Decision<T>] => {
    const factory = createDecisionMockImplementation(inputs, mockMethods);
    const decisionContext = createDecisionContextMock(inputs);
    const modelContext = createModelContextMock(inputs[0]);
    const decision = factory(modelContext[0]) as Decision<T>;

    return [decisionContext[0], decision];
};
