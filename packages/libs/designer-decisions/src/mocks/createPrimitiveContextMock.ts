import { type Mock, vi } from 'vitest';

import { type DecisionContext } from '../decision-context';
import type { PrimitiveContext } from '../primitive';

import { createValueContextMock } from './createValueContextMock';

type Mocks = {
    resolveSpy: Mock;
    forOutputSpy: Mock;
    addErrorSpy: Mock;
};

export function createPrimitiveContextMock<I>(input?: I): [PrimitiveContext<I>, Mocks] {
    const resolveSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const forOutputSpy = vi.fn();
    const refSpy = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockModelContext = {} as DecisionContext;
    mockModelContext.ref = refSpy;

    const [mockValueContext] = createValueContextMock();

    const mockPrimitiveContext = {} as PrimitiveContext;
    mockPrimitiveContext.valueContext = vi.fn().mockReturnValue(mockValueContext);
    mockPrimitiveContext.input = vi.fn().mockReturnValue(input);
    mockPrimitiveContext.forOutput = forOutputSpy;
    mockPrimitiveContext.addError = addErrorSpy;

    return [mockPrimitiveContext, { resolveSpy, forOutputSpy, addErrorSpy }];
}
