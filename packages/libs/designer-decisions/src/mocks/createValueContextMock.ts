import { type Mock, vi } from 'vitest';

import type { DecisionContext } from '../decision-context';
import type { ValueContext } from '../value';

import { createPrimitiveContextMock } from './createPrimitiveContextMock';

type Mocks = {
    resolveSpy: Mock;
    addErrorSpy: Mock;
    primitiveContextSpy: Mock;
};

export function createValueContextMock<I>(input?: I): [ValueContext<I>, Mocks] {
    const resolveSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const primitiveContextSpy = vi.fn();

    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockValueContext = {} as ValueContext;
    mockValueContext.input = vi.fn().mockReturnValue(input);
    mockValueContext.ref = vi.fn().mockReturnValue({ $name: 'foo bar' });
    mockValueContext.childContext = vi.fn().mockImplementation(i => createValueContextMock(i)[0]);
    mockValueContext.primitiveContext = primitiveContextSpy;
    mockValueContext.lookupContexts = vi.fn().mockReturnValue({ all: [] });
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;

    primitiveContextSpy.mockImplementation(input => createPrimitiveContextMock(input)[0]);

    return [mockValueContext, { resolveSpy, primitiveContextSpy, addErrorSpy }];
}
