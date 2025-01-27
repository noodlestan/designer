import { describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../../types';

import { createInvalidInputError } from './createInvalidInputError';

describe('createInvalidInputError()', () => {
    const mockDecisionContext = {
        ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
    };
    const refStr = JSON.stringify(mockDecisionContext.ref());
    const mockContext = {
        decisionContext: vi.fn(() => mockDecisionContext),
    } as unknown as ValueContext;

    const name = 'ValueName';
    const input = { key: 'value' };
    const inputStr = JSON.stringify(input);

    describe('Given context, name, data, and no error', () => {
        it('should return a DecisionValueError object with the expected message', () => {
            const result = createInvalidInputError({ context: mockContext, name, input });

            const expectedMessage = `Invalid input data for a ${name} in ${refStr}: ${inputStr}.`;
            expect(result.msg).toBe(expectedMessage);
        });
    });

    describe('Given context, name, data, and an Error', () => {
        it('should return a DecisionValueError object with the expected message', () => {
            const error = new Error('Sample error');
            const result = createInvalidInputError({ context: mockContext, name, input, error });

            const expectedMessage = `Invalid input data for a ${name} in ${refStr}: ${inputStr} Error: "${error.stack}".`;
            expect(result.msg).toBe(expectedMessage);
        });
    });

    describe('Given context, name, data, and an non-Error object', () => {
        it('should return a DecisionValueError object with the expected message', () => {
            const error = { code: 123, message: 'Sample error object' };
            const result = createInvalidInputError({ context: mockContext, name, input, error });

            const expectedMessage = `Invalid input data for a ${name} in ${refStr}: ${inputStr} Error: "${JSON.stringify(error)}".`;
            expect(result.msg).toBe(expectedMessage);
        });
    });
});
