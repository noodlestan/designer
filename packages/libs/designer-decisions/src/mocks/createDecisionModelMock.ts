import { vi } from 'vitest';

import type { DecisionModel } from '../models';
import type { BaseValue } from '../primitives';
import type { ValueContext } from '../values';

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
