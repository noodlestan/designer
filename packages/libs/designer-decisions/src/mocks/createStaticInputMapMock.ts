import type { ErrorObject } from 'ajv';
import { vi } from 'vitest';

import type { StaticInputMap } from '../decisions';
import type { InputRecord } from '../types';

export function createStaticInputMapMock(
    inputs?: InputRecord[],
    errors?: ErrorObject[],
): StaticInputMap {
    return {
        hasErrors: vi.fn(),
        validationErrors: vi.fn(),
        records: vi.fn().mockReturnValue(inputs),
        findByRef: vi.fn().mockReturnValue(inputs ? [{ decision: inputs, errors }] : []),
    };
}
