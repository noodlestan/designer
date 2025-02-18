import type { Decision, DecisionContext } from '../decisions';
import type { DecisionInput } from '../inputs';
import type { BaseValue } from '../primitives';

import { createStaticDecisionMockImplementation } from './createStaticDecisionMockImplementation';

export const createStaticDecisionMock = <T extends BaseValue<unknown> = BaseValue<unknown>>(
    inputs: DecisionInput[],
    mockMethods: Record<string, () => unknown> = {},
): [DecisionContext, Decision<T>] => {
    const factory = createStaticDecisionMockImplementation(mockMethods, inputs);
    const decisionContext = {} as DecisionContext;
    const decision = factory(decisionContext) as Decision<T>;

    return [decisionContext, decision];
};
