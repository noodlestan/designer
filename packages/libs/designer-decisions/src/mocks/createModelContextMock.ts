import { type Mock, vi } from 'vitest';

import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';
import type { ModelContext } from '../model';
import type { DeepPartial } from '../private';

import { createValueContextMock } from './createValueContextMock';

type Mocks = {
    valueContextSpy: Mock;
};

export function createModelContextMock(input?: DeepPartial<DecisionInput>): [ModelContext, Mocks] {
    const valueContextSpy = vi.fn();

    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'decision-uuid' });

    const mockModelContext = {} as ModelContext;
    mockModelContext.decisionInput = vi.fn().mockReturnValue(input);
    mockModelContext.params = vi.fn().mockReturnValue(input?.params);
    mockModelContext.forValue = valueContextSpy;
    mockModelContext.hasOwnErrors = () => false;
    mockModelContext.ownErrors = () => [];

    valueContextSpy.mockImplementation(input => createValueContextMock(input)[0]);

    return [mockModelContext, { valueContextSpy }];
}
