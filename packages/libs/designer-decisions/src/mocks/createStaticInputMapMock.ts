import type { ErrorObject } from 'ajv';
import { vi } from 'vitest';

import type { InputRecord, StaticInputMap } from '../inputs';

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
