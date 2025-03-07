import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../mocks';

import { ERROR_LAYER_VALUE, ERROR_VALUE_INPUT } from './constants';
import { createValueInputError } from './createValueInputError';

describe('createValueInputError()', () => {
    const [mockValueContext] = createValueContextMock();

    const valueName = 'foo-value';
    const input = { key: 'value' };

    const context = mockValueContext;

    describe('Given context, value name, input, and no error', () => {
        it('should return a ValueInputError( object with the expected attributes', () => {
            const result = createValueInputError({ context, valueName, input });
            expect(result.layer).toBe(ERROR_LAYER_VALUE);
            expect(result.name).toBe(ERROR_VALUE_INPUT);
            expect(result.context).toBe(mockValueContext);
            expect(result.valueName).toBe(valueName);
            expect(result.input).toBe(input);
            expect(result.error).toBeUndefined();
        });

        it('should return a ValueInputError( object with the expected message', () => {
            const result = createValueInputError({ context, valueName, input });
            expect(result.message()).toContain('Invalid Value Input for foo-value');
        });
    });

    describe('Given context, value name, input, and an Error', () => {
        const error = new Error('Foo error');

        it('should return a ValueInputError( object with the error', () => {
            const result = createValueInputError({ context, valueName, input, error });
            expect(result.error).toBe(error);
        });

        it('should return a ValueInputError( object with the expected message', () => {
            const result = createValueInputError({ context, valueName, input, error });
            expect(result.message()).toContain('Foo error');
        });
    });

    describe('Given context, value name, input, and a string error', () => {
        const error = 'Foo error';

        it('should return a ValueInputError( object with the error', () => {
            const result = createValueInputError({ context, valueName, input, error });
            expect(result.error).toBe(error);
        });

        it('should return a ValueInputError( object with the expected message', () => {
            const result = createValueInputError({ context, valueName, input, error });
            expect(result.message()).toContain(error);
        });
    });
});
