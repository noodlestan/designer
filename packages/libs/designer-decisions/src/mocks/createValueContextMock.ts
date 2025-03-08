import { type Mock, vi } from 'vitest';

import type { ValueContext } from '../value';

import { createDecisionContextMock } from './createDecisionContextMock';
import { createModelContextMock } from './createModelContextMock';
import { createPrimitiveContextMock } from './createPrimitiveContextMock';

type Mocks = {
    resolveSpy: Mock;
    addErrorSpy: Mock;
    forPrimitiveSpy: Mock;
};

export function createValueContextMock<I>(input?: I): [ValueContext<I>, Mocks] {
    const resolveSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const forPrimitiveSpy = vi.fn();

    const [mockDecisionContext] = createDecisionContextMock();
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const [mockModelContext] = createModelContextMock();
    mockModelContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockValueContext = {} as ValueContext;
    mockValueContext.input = vi.fn().mockReturnValue(input);
    mockValueContext.ref = vi.fn().mockReturnValue({ $name: 'foo bar' });
    mockValueContext.modelContext = vi.fn().mockReturnValue(mockModelContext);
    mockValueContext.decisionContext = vi.fn().mockReturnValue(mockDecisionContext);
    mockValueContext.forChildValue = vi.fn().mockImplementation(i => createValueContextMock(i)[0]);
    mockValueContext.forPrimitive = forPrimitiveSpy;
    mockValueContext.lookupContexts = vi.fn().mockReturnValue({ all: [] });
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;

    forPrimitiveSpy.mockImplementation(input => createPrimitiveContextMock(input)[0]);

    return [mockValueContext, { resolveSpy, forPrimitiveSpy, addErrorSpy }];
}
