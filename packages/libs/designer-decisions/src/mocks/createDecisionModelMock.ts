import { vi } from 'vitest';

import type { DecisionModel } from '../models';
import type { ValueContext } from '../value';
import type { BaseValue } from '../values';

export function createDecisionModelMock(
    decisionType: string,
    mockValue: string,
): DecisionModel<string, object> {
    return {
        produce: vi.fn().mockImplementation((context: ValueContext): BaseValue<string> => {
            return {
                type: () => decisionType,
                context: () => context,
                get: () => mockValue,
            };
        }),
    };
}
