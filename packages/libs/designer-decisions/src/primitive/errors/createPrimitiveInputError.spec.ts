import { describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../../value';
import type { PrimitiveContext } from '../types';

import { createPrimitiveInputError } from './createPrimitiveInputError';

describe('createPrimitiveInputError()', () => {
    const mockDecisionContext = {
        ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
    };
    const mockValueContext = {
        decisionContext: vi.fn(() => mockDecisionContext),
    } as unknown as ValueContext;

    const mockPrimitiveContext = {
        valueContext: vi.fn(() => mockValueContext),
    } as unknown as PrimitiveContext;

    const primitiveName = 'primitiveName';
    const input = { key: 'value' };

    const context = mockPrimitiveContext;

    describe('Given context, name, data, and no error', () => {
        it('should return a ValueRefIndexError object with the expected attributes', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input });

            expect(result.context).toBe(mockPrimitiveContext);
            expect(result.primitiveName).toBe(primitiveName);
            expect(result.input).toBe(input);
            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input });

            expect(result.message()).toContain('Invalid input data for a primitiveName');
        });
    });

    describe('Given context, name, data, and an Error', () => {
        const error = new Error('Sample error');

        it('should return a ValueRefIndexError object with the error', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });

            expect(result.message()).toContain('Sample error');
        });
    });

    describe('Given context, name, data, and a non-Error object', () => {
        const error = { code: 123, message: 'Sample error object' };

        it('should return a ValueRefIndexError object with the error', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });

            expect(result.message()).toContain(JSON.stringify(error));
        });
    });
});
