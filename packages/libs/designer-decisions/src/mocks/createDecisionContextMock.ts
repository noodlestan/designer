import { type Mock, vi } from 'vitest';

import type { DecisionContext } from '../types';

type Mocks = {
    resolveSpy: Mock;
    addErrorSpy: Mock;
};

export function createDecisionContextMock(): [DecisionContext, Mocks] {
    const resolveSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockValueContext = {} as DecisionContext;
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;

    return [mockValueContext, { resolveSpy, addErrorSpy }];
}
