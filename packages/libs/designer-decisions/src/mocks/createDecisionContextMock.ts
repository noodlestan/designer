import { type Mock, vi } from 'vitest';

import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';

import { decisionTypeFromModel } from './functions';

type Mocks = {
    resolveSpy: Mock;
    addErrorSpy: Mock;
};

export function createDecisionContextMock(inputs: DecisionInput[] = []): [DecisionContext, Mocks] {
    const resolveSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockValueContext = {
        decisionType: () => decisionTypeFromModel(inputs[0].model),
        ref: () => ({ $name: 'Name' }),
        inputs: () => inputs,
    } as DecisionContext;
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;

    return [mockValueContext, { resolveSpy, addErrorSpy }];
}
