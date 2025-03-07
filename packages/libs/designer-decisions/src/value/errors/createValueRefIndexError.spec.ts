import { describe, expect, it } from 'vitest';

import type { DecisionRef } from '../../inputs';
import { createValueContextMock } from '../../mocks';

import { ERROR_LAYER_VALUE, ERROR_VALUE_REF_INDEX } from './constants';
import { createValueRefIndexError } from './createValueRefIndexError';

describe('createValueRefIndexError()', () => {
    describe('Given context, value name, and ref', () => {
        const [mockValueContext] = createValueContextMock();

        const valueName = 'foo-value';
        const mockRef: DecisionRef = { $uuid: 'ref-uuid', index: 99 };

        it('should return a ValueRefIndexError object with the expected attributes', () => {
            const result = createValueRefIndexError({
                context: mockValueContext,
                valueName,
                ref: mockRef,
            });
            expect(result.layer).toBe(ERROR_LAYER_VALUE);
            expect(result.name).toBe(ERROR_VALUE_REF_INDEX);
            expect(result.context).toBe(mockValueContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
        });

        it('should return a ValueRefIndexError object with the expected message', () => {
            const result = createValueRefIndexError({
                context: mockValueContext,
                valueName,
                ref: mockRef,
            });
            expect(result.message()).toContain('Ref Index Out of Bounds resolving foo-value');
        });
    });
});
