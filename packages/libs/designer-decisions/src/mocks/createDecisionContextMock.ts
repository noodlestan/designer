import { type Mock, vi } from 'vitest';

import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';
import type { ValidatedRecord } from '../record';

import { decisionTypeFromModel } from './functions';

type Mocks = {
    resolveSpy: Mock;
    addErrorSpy: Mock;
};

export function createDecisionContextMock(
    inputs: DecisionInput[] = [{} as DecisionInput],
): [DecisionContext, Mocks] {
    const resolveSpy = vi.fn();
    const addErrorSpy = vi.fn();
    const mockDecisionContext = {} as DecisionContext;
    mockDecisionContext.ref = vi.fn().mockReturnValue({ $uuid: 'test-uuid' });

    const records = inputs.map(input => ({ input, source: {} }) as ValidatedRecord);

    const mockValueContext = {
        decisionType: () => decisionTypeFromModel(inputs[0].model),
        ref: () => ({ $uuid: 'test-uuid' }),
        records: () => records,
    } as DecisionContext;
    mockValueContext.resolve = resolveSpy;
    mockValueContext.addError = addErrorSpy;
    mockValueContext.hasErrors = () => false;
    mockValueContext.errors = () => [];

    return [mockValueContext, { resolveSpy, addErrorSpy }];
}
