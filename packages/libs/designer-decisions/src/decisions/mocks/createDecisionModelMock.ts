import { vi } from 'vitest';

import type { BaseValue, DecisionModel, DecisionValueContext } from '../../types';

export function createDecisionModelMock(mockValue: string): DecisionModel<string, object> {
    return {
        produce: vi.fn().mockImplementation((context: DecisionValueContext): BaseValue<string> => {
            return {
                context: () => context,
                get: () => mockValue,
            };
        }),
    };
}
