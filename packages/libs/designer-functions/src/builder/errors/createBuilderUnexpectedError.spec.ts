import { describe, expect, it } from 'vitest';

import { ERROR_BUILDER_UNEXPECTED, ERROR_LAYER_BUILDER } from './constants';
import { createBuilderUnexpectedError } from './createBuilderUnexpectedError';

describe('createBuilderUnexpectedError()', () => {
    describe('Given a context and an error', () => {
        const mockError = new Error('Test error');

        it('should return a BuilderError object with the expected name', () => {
            const result = createBuilderUnexpectedError({ error: mockError });
            expect(result.layer).toBe(ERROR_LAYER_BUILDER);
            expect(result.name).toBe(ERROR_BUILDER_UNEXPECTED);
        });

        it('should return a BuilderError object with the expected error', () => {
            const result = createBuilderUnexpectedError({ error: mockError });
            expect(result.error).toEqual(mockError);
        });

        it('should return a BuilderError object with the expected message', () => {
            const result = createBuilderUnexpectedError({ error: mockError });
            expect(result.message()).toContain('Unexpected Store Error');
        });
    });

    describe('Given a context and no error', () => {
        it('should return a BuilderError object with no error object', () => {
            const result = createBuilderUnexpectedError();
            expect(result.error).toBeUndefined();
        });
    });
});
