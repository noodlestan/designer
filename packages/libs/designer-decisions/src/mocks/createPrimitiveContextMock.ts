import { type Mock, vi } from 'vitest';

import type { DecisionContext } from '../decision-context';
import type { PrimitiveContext } from '../primitive';
import type { ValueContext } from '../value';

type Mocks = {
    resolveSpy: Mock;
    outputContextSpy: Mock;
    addErrorSpy: Mock;
};

export function createPrimitiveContextMock(input?: unknown): [PrimitiveContext, Mocks] {
    const resolveSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const outputContextSpy = vi.fn();
    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockValueContext = {} as ValueContext;
    mockValueContext.decisionContext = vi.fn().mockReturnValue(mockDecisionContext);

    const mockPrimitiveContext = {} as PrimitiveContext;
    mockPrimitiveContext.valueContext = vi.fn().mockReturnValue(mockValueContext);
    mockPrimitiveContext.input = vi.fn().mockReturnValue(input);
    mockPrimitiveContext.outputContext = outputContextSpy;
    mockPrimitiveContext.addError = addErrorSpy;

    return [mockPrimitiveContext, { resolveSpy, outputContextSpy, addErrorSpy }];
}
