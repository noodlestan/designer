import { describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../../value';
import type { PrimitiveContext } from '../types';

import { createPrimitiveInputError } from './createPrimitiveInputError';

describe('createPrimitiveInputError()', () => {
    const mockRef = { $uuid: 'test-uuid' };
    const mockDecisionContext = {
        ref: vi.fn(() => mockRef),
    };
    const mockValueContext = {
        decisionContext: vi.fn(() => mockDecisionContext),
        ref: vi.fn(() => mockRef),
    } as unknown as ValueContext;

    const mockPrimitiveContext = {
        valueContext: vi.fn(() => mockValueContext),
    } as unknown as PrimitiveContext;

    const primitiveName = 'primitiveName';
    const input = { key: 'value' };

    const context = mockPrimitiveContext;

    describe('Given context, primitive name, input, and no error', () => {
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

    describe('Given context, primitive name, input, and an Error', () => {
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

    describe('Given context, primitive name, input, and a non-Error object', () => {
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
