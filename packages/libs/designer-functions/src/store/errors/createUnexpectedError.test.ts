import { describe, expect, it } from 'vitest';

import { ERROR_STORE_UNEXPECTED } from './constants';
import { createUnexpectedError } from './createUnexpectedError';

describe('createUnexpectedError()', () => {
    describe('Given a context and an error', () => {
        const mockError = new Error('Test error');

        it('should return a StoreError object with the expected name', () => {
            const result = createUnexpectedError({ error: mockError });

            expect(result.name).toEqual(ERROR_STORE_UNEXPECTED);
        });

        it('should return a StoreError object with the expected error', () => {
            const result = createUnexpectedError({ error: mockError });

            expect(result.error).toEqual(mockError);
        });

        it('should return a StoreError object with the expected message', () => {
            const result = createUnexpectedError({ error: mockError });

            expect(result.message()).toContain('Unexpected store error');
        });
    });

    describe('Given a context and no error', () => {
        it('should return a StoreError object with no error object', () => {
            const result = createUnexpectedError();

            expect(result.error).toBeUndefined();
        });
    });
});
