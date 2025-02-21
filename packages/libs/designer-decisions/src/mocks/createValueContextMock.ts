import { type Mock, vi } from 'vitest';

import type { DecisionContext } from '../decision';
import type { ValueContext } from '../value';

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
    mockValueContext.decisionContext = vi.fn().mockReturnValue(mockDecisionContext);
    mockValueContext.lookupContexts = vi.fn().mockReturnValue({ all: [] });
    mockValueContext.childContext = vi.fn().mockImplementation(() => createValueContextMock()[0]);
    mockValueContext.nestedContext = vi.fn().mockImplementation(() => createValueContextMock()[0]);
    mockValueContext.consume = consumeSpy;
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;

    return [mockValueContext, { resolveSpy, consumeSpy, addErrorSpy }];
}
