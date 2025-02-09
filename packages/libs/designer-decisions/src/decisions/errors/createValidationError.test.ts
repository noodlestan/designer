import type { ErrorObject } from 'ajv';
import { describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../createDecisionContext';

import { createValidationError } from './createValidationError';

describe('createValidationError()', () => {
    const ref = { $uuid: 'test-uuid' };
    const mockContext = createDecisionContext(ref, vi.fn(), []);

    describe('Given a context and an error', () => {
        const mockError = new Error('Test error') as unknown as ErrorObject;

        it('should return a DecisionError object with the expected attributes', () => {
            const result = createValidationError({ context: mockContext, error: mockError });

            expect(result.context).toEqual(mockContext);
            expect(result.error).toEqual(mockError);
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createValidationError({ context: mockContext, error: mockError });

            expect(result.message()).toContain(
                'Validation error in {"$uuid":"test-uuid"}: Test error.',
            );
            expect(result.message()).toContain('test-uuid');
            expect(result.message()).toContain('Test error');
        });
    });

    describe('Given a context and no error', () => {
        it('should return a DecisionError object with no error object', () => {
            const result = createValidationError({ context: mockContext });

            expect(result.error).toBeUndefined();
        });

        it.only('should return a DecisionError object with the expected message', () => {
            const result = createValidationError({ context: mockContext });

            expect(result.message()).toContain('Validation error in {"$uuid":"test-uuid"}');
            expect(result.message()).toContain('test-uuid');
            expect(result.message()).toContain('undefined');
        });
    });
});
