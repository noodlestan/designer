import { vi } from 'vitest';

import type { StaticInputMap } from '../../decisions';
import type { DecisionInputBase } from '../../types';

export function createStaticInputMapMock(inputs: DecisionInputBase[]): StaticInputMap {
    return {
        hasErrors: vi.fn(),
        validationErrors: vi.fn(),
        records: vi.fn().mockReturnValue(inputs),
    };
}
