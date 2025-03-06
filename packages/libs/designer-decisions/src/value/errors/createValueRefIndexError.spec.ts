import { describe, expect, it, vi } from 'vitest';

import type { DecisionRef } from '../../inputs';
import type { ValueContext } from '../types';

import { createValueRefIndexError } from './createValueRefIndexError';

describe('createValueRefIndexError()', () => {
    describe('Given context, value name, and ref', () => {
        const mockValueContext = {
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as ValueContext;

        const valueName = 'ValueName';
        const mockRef: DecisionRef = { $uuid: 'ref-uuid', index: 99 };

        it('should return a ValueRefIndexError object with the expected attributes', () => {
            const result = createValueRefIndexError({
                context: mockValueContext,
                valueName,
                ref: mockRef,
            });

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

            expect(result.message()).toContain('out of bounds');
        });
    });
});
