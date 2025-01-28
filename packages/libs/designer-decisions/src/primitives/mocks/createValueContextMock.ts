import { type Mock, vi } from 'vitest';

import type { DecisionContext, ValueContext } from '../../types';

type Mocks = {
    resolveSpy: Mock;
    consumeSpy: Mock;
    addErrorSpy: Mock;
};

export function createValueContextMock(): [ValueContext, Mocks] {
    const resolveSpy = vi.fn();
    const consumeSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockValueContext = {} as ValueContext;
    mockValueContext.consume = consumeSpy;
    mockValueContext.decisionContext = vi.fn().mockReturnValue(mockDecisionContext);
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;

    return [mockValueContext, { resolveSpy, consumeSpy, addErrorSpy }];
}
