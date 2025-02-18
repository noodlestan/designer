import type {
    DecisionInput,
    DecisionInputError,
    StaticValidatedMap,
} from '@noodlestan/designer-decisions';
import { vi } from 'vitest';

export function createStaticValidatedMapMock(
    inputs?: DecisionInput[],
    errors?: DecisionInputError[],
): StaticValidatedMap {
    const records = inputs?.map(input => ({
        input,
        source: {},
        loaded: input,
        errors: errors || [],
    }));

    return {
        hasErrors: vi.fn(),
        inputErrors: vi.fn(),
        records: vi.fn().mockReturnValue(records),
        findByRef: vi.fn().mockReturnValue(inputs ? records : []),
    };
}
