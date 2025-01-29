import { vi } from 'vitest';

import type { BaseValue, DecisionModel, ValueContext } from '../types';

export function createDecisionModelMock(mockValue: string): DecisionModel<string, object> {
    return {
        produce: vi.fn().mockImplementation((context: ValueContext): BaseValue<string> => {
            return {
                context: () => context,
                get: () => mockValue,
            };
        }),
    };
}
