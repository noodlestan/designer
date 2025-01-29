import type { BaseValue, Decision, DecisionContext, InputRecord } from '../types';

import { createStaticDecisionMockImplementation } from './createStaticDecisionMockImplementation';

export const createStaticDecisionMock = <T extends BaseValue<unknown> = BaseValue<unknown>>(
    inputs: InputRecord[],
    mockMethods: Record<string, () => unknown> = {},
): [DecisionContext, Decision<T>] => {
    const factory = createStaticDecisionMockImplementation(mockMethods);
    const decisionContext = {} as DecisionContext;
    const decision = factory(decisionContext, inputs) as Decision<T>;

    return [decisionContext, decision];
};
