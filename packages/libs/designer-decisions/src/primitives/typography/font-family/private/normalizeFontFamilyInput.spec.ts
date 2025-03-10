import { describe, expect, it } from 'vitest';

import type { FontFamilyLiteral } from '../../../../inputs';
import { createPrimitiveContextMock } from '../../../../mocks';
import { ERROR_PRIMITIVE_INPUT, type PrimitiveInputError } from '../../../../primitive';
import { FONT_FAMILY_FALLBACK_LITERAL } from '../constants';

import { normalizeFontFamilyInput } from './normalizeFontFamilyInput';

describe('normalizeFontFamilyInput()', () => {
    const fontFamilyFallback = FONT_FAMILY_FALLBACK_LITERAL;

    describe('When input is a string', () => {
        const mockInput = 'foo, bar';
        const [mockPrimitiveContext] = createPrimitiveContextMock(mockInput);

        it('should split it and return the items', () => {
            const result = normalizeFontFamilyInput(mockPrimitiveContext);
            expect(result).toEqual(['foo', ' bar']);
        });
    });

    describe('When input is an array', () => {
        const mockInput = ['foo', ' bar'];
        const [mockPrimitiveContext] = createPrimitiveContextMock(mockInput);

        it('should return the items', () => {
            const result = normalizeFontFamilyInput(mockPrimitiveContext);
            expect(result).toEqual(['foo', ' bar']);
        });
    });

    describe('When input is invalid', () => {
        const invalidInputs = [null, undefined, true, false, 123, { foo: 'bar' }];

        it.each(invalidInputs)(
            'should return the fallback value for invalid input: %s',
            invalidInput => {
                const [mockPrimitiveContext] = createPrimitiveContextMock(
                    invalidInput as unknown as FontFamilyLiteral,
                );
                const result = normalizeFontFamilyInput(mockPrimitiveContext);
                expect(result).toEqual(fontFamilyFallback);
            },
        );
        it.each(invalidInputs)(
            'should add an error to the context for invalid input: %s',
            invalidInput => {
                const [mockPrimitiveContext, { addErrorSpy }] = createPrimitiveContextMock(
                    invalidInput as unknown as FontFamilyLiteral,
                );
                normalizeFontFamilyInput(mockPrimitiveContext);
                expect(addErrorSpy).toHaveBeenCalledOnce();

                const expectedReason = 'FontFamilyLiteral';
                const error = addErrorSpy.mock.calls[0][0] as PrimitiveInputError;
                expect(error.name).toEqual(ERROR_PRIMITIVE_INPUT);
                expect(error.primitiveName).toEqual('FontFamily');
                expect(error.input).toEqual(invalidInput);
                expect(error.context).toEqual(mockPrimitiveContext);
                expect(error.message()).toContain(expectedReason);
            },
        );
    });
});
