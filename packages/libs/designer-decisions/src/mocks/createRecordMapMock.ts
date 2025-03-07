import { vi } from 'vitest';

import type { DecisionInput } from '../inputs';
import type { RecordError, RecordMap } from '../record';

export function createRecordMapMock(inputs?: DecisionInput[], errors?: RecordError[]): RecordMap {
    const records =
        inputs?.map(input => ({
            input,
            source: {},
            loaded: input,
            errors: errors || [],
        })) || [];

    return {
        hasErrors: vi.fn(),
        inputErrors: vi.fn(),
        records: vi.fn().mockReturnValue(records),
        findByRef: vi.fn().mockReturnValue(records),
    };
}
