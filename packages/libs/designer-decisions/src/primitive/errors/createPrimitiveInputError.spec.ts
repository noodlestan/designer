import { describe, expect, it, vi } from 'vitest';

import {
    createDecisionContextMock,
    createPrimitiveContextMock,
    createValueContextMock,
} from '../../mocks';

import { ERROR_LAYER_PRIMTIVE, ERROR_P_INPUT } from './constants';
import { createPrimitiveInputError } from './createPrimitiveInputError';

describe('createPrimitiveInputError()', () => {
    const mockRef = { $uuid: 'test-uuid' };
    const [mockDecisionContext] = createDecisionContextMock();
    mockDecisionContext.ref = vi.fn(() => mockRef);

    const [mockValueContext] = createValueContextMock();
    mockValueContext.ref = vi.fn(() => mockRef);
    mockValueContext.decisionContext = vi.fn(() => mockDecisionContext);

    const [mockPrimitiveContext] = createPrimitiveContextMock();
    mockPrimitiveContext.valueContext = vi.fn(() => mockValueContext);

    const primitiveName = 'PrimitiveName';
    const input = { key: 'value' };

    const context = mockPrimitiveContext;

    describe('Given context, primitive name, input, and no error', () => {
        it('should return a PrimitiveInputError object with the expected attributes', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input });
            expect(result.layer).toBe(ERROR_LAYER_PRIMTIVE);
            expect(result.name).toBe(ERROR_P_INPUT);
            expect(result.context).toBe(mockPrimitiveContext);
            expect(result.primitiveName).toBe(primitiveName);
            expect(result.input).toBe(input);
            expect(result.error).toBeUndefined();
        });

        it('should return a PrimitiveInputError object with the expected message', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input });
            expect(result.message()).toContain('Invalid Primitive Input for PrimitiveName');
        });
    });

    describe('Given context, primitive name, input, and an Error', () => {
        const error = new Error('Foo error');

        it('should return a PrimitiveInputError object with the error', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });
            expect(result.error).toBe(error);
        });

        it('should return a PrimitiveInputError object with the expected message', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });
            expect(result.message()).toContain('Foo error');
        });
    });

    describe('Given context, primitive name, input, and a string error', () => {
        const error = 'Foo error';

        it('should return a PrimitiveInputError object with the error', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });
            expect(result.error).toBe(error);
        });

        it('should return a PrimitiveInputError object with the expected message', () => {
            const result = createPrimitiveInputError({ context, primitiveName, input, error });
            expect(result.message()).toContain(error);
        });
    });
});
