import type { Decision } from '../decision';
import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';
import type { BaseValue } from '../values';

import { createDecisionMockImplementation } from './createDecisionMockImplementation';

export const createDecisionMock = <T extends BaseValue<unknown> = BaseValue<unknown>>(
    inputs: DecisionInput[],
    mockMethods: Record<string, () => unknown> = {},
): [DecisionContext, Decision<T>] => {
    const factory = createDecisionMockImplementation(inputs, mockMethods);
    const decisionContext = {} as DecisionContext;
    const decision = factory(decisionContext) as Decision<T>;

    return [decisionContext, decision];
};
