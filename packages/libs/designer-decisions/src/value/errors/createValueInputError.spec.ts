import { describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../types';

import { createValueInputError } from './createValueInputError';

describe('createValueInputError()', () => {
    const mockValueContext = {
        ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
    } as unknown as ValueContext;

    const valueName = 'ValueName';
    const input = { key: 'value' };

    const context = mockValueContext;

    describe('Given context, value name, input, and no error', () => {
        it('should return a ValueRefIndexError object with the expected attributes', () => {
            const result = createValueInputError({ context, valueName, input });

            expect(result.context).toBe(mockValueContext);
            expect(result.valueName).toBe(valueName);
            expect(result.input).toBe(input);
            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createValueInputError({ context, valueName, input });

            expect(result.message()).toContain('Invalid input data for a ValueName');
        });
    });

    describe('Given context, value name, input, and an Error', () => {
        const error = new Error('Sample error');

        it('should return a ValueRefIndexError object with the error', () => {
            const result = createValueInputError({ context, valueName, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createValueInputError({ context, valueName, input, error });

            expect(result.message()).toContain('Sample error');
        });
    });

    describe('Given context, value name, input, and a non-Error object', () => {
        const error = { code: 123, message: 'Sample error object' };

        it('should return a ValueRefIndexError object with the error', () => {
            const result = createValueInputError({ context, valueName, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createValueInputError({ context, valueName, input, error });

            expect(result.message()).toContain(JSON.stringify(error));
        });
    });
});
