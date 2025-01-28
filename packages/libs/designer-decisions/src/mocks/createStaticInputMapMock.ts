import { vi } from 'vitest';

import type { StaticInputMap } from '../decisions';
import type { InputRecord } from '../types';

export function createStaticInputMapMock(inputs: InputRecord[]): StaticInputMap {
    return {
        hasErrors: vi.fn(),
        validationErrors: vi.fn(),
        records: vi.fn().mockReturnValue(inputs),
    };
}
