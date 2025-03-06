import { describe, expect, it, vi } from 'vitest';

import { createModelUnexpectedError } from './createModelUnexpectedError';
import type { ModelContext } from './types';

describe('createModelUnexpectedError()', () => {
    const mockRef = { $uuid: 'test-uuid' };
    const mockDecisionContext = {
        ref: vi.fn(() => mockRef),
    };
    const mockValueContext = {
        decisionContext: vi.fn(() => mockDecisionContext),
    } as unknown as ModelContext;

    const input = { key: 'value' };

    const context = mockValueContext;

    describe('Given context, input, and no error', () => {
        it('should return a ValueRefIndexError object with the expected attributes', () => {
            const result = createModelUnexpectedError({ context, input });

            expect(result.context).toBe(mockValueContext);
            expect(result.input).toBe(input);
            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createModelUnexpectedError({ context, input });

            expect(result.message()).toContain('Invalid input data');
            expect(result.message()).toContain(JSON.stringify(mockRef));
        });
    });

    describe('Given context, input, and an Error', () => {
        const error = new Error('Sample error');

        it('should return a ValueRefIndexError object with the error', () => {
            const result = createModelUnexpectedError({ context, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createModelUnexpectedError({ context, input, error });

            expect(result.message()).toContain('Sample error');
        });
    });

    describe('Given context, input, and a non-Error object', () => {
        const error = { code: 123, message: 'Sample error object' };

        it('should return a ValueRefIndexError object with the error', () => {
            const result = createModelUnexpectedError({ context, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createModelUnexpectedError({ context, input, error });

            expect(result.message()).toContain(JSON.stringify(error));
        });
    });
});
