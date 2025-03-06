import { type Mock, vi } from 'vitest';

import type { DecisionModel } from '../models';
import type { ValueContext } from '../value';
import type { BaseValue } from '../values';

import { createValueContextMock } from './createValueContextMock';

type Mocks = {
    produceSpy: Mock;
};

export function createDecisionModelMock(
    decisionType: string,
    mockValue: string,
    mockValueContext?: ValueContext,
): [DecisionModel<string, object>, Mocks] {
    const produceSpy = vi.fn().mockImplementation((): BaseValue<string> => {
        return {
            type: () => decisionType,
            context: () => mockValueContext || createValueContextMock()[0],
            get: () => mockValue,
        };
    });

    const mockModel = {
        produce: produceSpy,
    };

    return [mockModel, { produceSpy }];
}
