import { type Mock, vi } from 'vitest';

import type { DecisionContext, DecisionUnknown, ValueContext } from '../../types';

import { createValueContextMock } from './createValueContextMock';

type Mocks = {
    resolveSpy: Mock;
    consumeSpy: Mock;
    addErrorSpy: Mock;
};

export function createValueContextWithResolveMock(
    resolution: [DecisionContext | undefined, DecisionUnknown | undefined] = [undefined, undefined],
): [ValueContext, Mocks] {
    const resolveSpy = vi.fn();
    const consumeSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockValueContext = {} as ValueContext;
    mockValueContext.consume = consumeSpy;
    mockValueContext.childContext = vi.fn().mockImplementation(createValueContextMock);
    mockValueContext.lookupContexts = vi.fn().mockReturnValue({ all: [] });
    mockValueContext.decisionContext = vi.fn().mockReturnValue(mockDecisionContext);
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;

    resolveSpy.mockReturnValue(resolution);

    return [mockValueContext, { resolveSpy, consumeSpy, addErrorSpy }];
}
