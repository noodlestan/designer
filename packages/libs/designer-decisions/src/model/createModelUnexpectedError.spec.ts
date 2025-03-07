import { describe, expect, it, vi } from 'vitest';

import { createDecisionContextMock, createModelContextMock } from '../mocks';

import { ERROR_LAYER_MODEL, ERROR_MODEL_UNEXPECTED } from './constants';
import { createModelUnexpectedError } from './createModelUnexpectedError';

describe('createModelUnexpectedError()', () => {
    const mockRef = { $uuid: 'test-uuid' };
    const [mockDecisionContext] = createDecisionContextMock();
    mockDecisionContext.ref = vi.fn(() => mockRef);

    const [mockModelContext] = createModelContextMock();
    mockModelContext.ref = vi.fn(() => mockRef);
    mockModelContext.decisionContext = vi.fn(() => mockDecisionContext);

    const input = { key: 'value' };

    const context = mockModelContext;

    describe('Given context, input, and no error', () => {
        it('should return a ModelUnexpectedError object with the expected attributes', () => {
            const result = createModelUnexpectedError({ context, input });
            expect(result.layer).toBe(ERROR_LAYER_MODEL);
            expect(result.name).toBe(ERROR_MODEL_UNEXPECTED);
            expect(result.context).toBe(mockModelContext);
            expect(result.input).toBe(input);
            expect(result.error).toBeUndefined();
        });

        it('should return a ModelUnexpectedError object with the expected message', () => {
            const result = createModelUnexpectedError({ context, input });
            expect(result.message()).toContain('Unexpected Model Error.');
            expect(result.message()).toContain(JSON.stringify(mockRef));
        });
    });

    describe('Given context, input, and an Error', () => {
        const error = new Error('Foo error');

        it('should return a ModelUnexpectedError object with the error', () => {
            const result = createModelUnexpectedError({ context, input, error });
            expect(result.error).toBe(error);
        });

        it('should return a ModelUnexpectedError object with the expected message', () => {
            const result = createModelUnexpectedError({ context, input, error });
            expect(result.message()).toContain('Foo error');
        });
    });

    describe('Given context, input, and a string error', () => {
        const error = 'Foo error';

        it('should return a ModelUnexpectedError object with the error', () => {
            const result = createModelUnexpectedError({ context, input, error });
            expect(result.error).toBe(error);
        });

        it('should return a ModelUnexpectedError object with the expected message', () => {
            const result = createModelUnexpectedError({ context, input, error });
            expect(result.message()).toContain(error);
        });
    });
});
