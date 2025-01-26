import { vi } from 'vitest';

import type { StaticInputMap } from '../../inputs';
import type { DecisionInputBase } from '../../types';

export function createStaticInputMapMock(inputs: DecisionInputBase[]): StaticInputMap {
    return {
        hasErrors: vi.fn(),
        validationErrors: vi.fn(),
        records: vi.fn().mockReturnValue(inputs),
    };
}
