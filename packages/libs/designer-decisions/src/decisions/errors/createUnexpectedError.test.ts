import { describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../createDecisionContext';

import { createUnexpectedError } from './createUnexpectedError';

describe('createUnexpectedError()', () => {
    const ref = { $uuid: 'test-uuid' };
    const mockContext = createDecisionContext(ref, vi.fn(), []);

    describe('Given a context and an error', () => {
        const mockError = new Error('Test error');

        it('should return a DecisionError object with the expected attributes', () => {
            const result = createUnexpectedError({ context: mockContext, error: mockError });

            expect(result.context).toEqual(mockContext);
            expect(result.error).toEqual(mockError);
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createUnexpectedError({ context: mockContext, error: mockError });

            expect(result.message()).toContain('Unexpected error');
            expect(result.message()).toContain('test-uuid');
            expect(result.message()).toContain('Test error');
        });
    });

    describe('Given a context and no error', () => {
        it('should return a DecisionError object with no error object', () => {
            const result = createUnexpectedError({ context: mockContext });

            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createUnexpectedError({ context: mockContext });

            expect(result.message()).toContain('Unexpected error');
            expect(result.message()).toContain('test-uuid');
            expect(result.message()).toContain('undefined');
        });
    });
});
