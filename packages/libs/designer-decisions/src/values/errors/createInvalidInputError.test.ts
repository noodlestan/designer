import { describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../types';

import { createInvalidInputError } from './createInvalidInputError';

describe('createInvalidInputError()', () => {
    const mockDecisionContext = {
        ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
    };
    const mockContext = {
        decisionContext: vi.fn(() => mockDecisionContext),
    } as unknown as ValueContext;

    const valueName = 'ValueName';
    const input = { key: 'value' };

    const context = mockContext;

    describe('Given context, name, data, and no error', () => {
        it('should return a DecisionValueRefIndexError object with the expected attributes', () => {
            const result = createInvalidInputError({ context, valueName, input });

            expect(result.context).toBe(mockContext);
            expect(result.valueName).toBe(valueName);
            expect(result.input).toBe(input);
            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createInvalidInputError({ context, valueName, input });

            expect(result.message()).toContain('Invalid input data for a ValueName');
        });
    });

    describe('Given context, name, data, and an Error', () => {
        const error = new Error('Sample error');

        it('should return a DecisionValueRefIndexError object with the error', () => {
            const result = createInvalidInputError({ context, valueName, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createInvalidInputError({ context, valueName, input, error });

            expect(result.message()).toContain('Sample error');
        });
    });

    describe('Given context, name, data, and a non-Error object', () => {
        const error = { code: 123, message: 'Sample error object' };

        it('should return a DecisionValueRefIndexError object with the error', () => {
            const result = createInvalidInputError({ context, valueName, input, error });

            expect(result.error).toBe(error);
        });

        it('should return a DecisionValueInvalidInputError object with the expected message', () => {
            const result = createInvalidInputError({ context, valueName, input, error });

            expect(result.message()).toContain(JSON.stringify(error));
        });
    });
});
