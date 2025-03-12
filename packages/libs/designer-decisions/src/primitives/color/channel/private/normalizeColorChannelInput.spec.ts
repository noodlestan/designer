import { describe, expect, it } from 'vitest';

import { createPrimitiveContextMock, mockChannelDefinition } from '../../../../mocks';
import { ERROR_P_INPUT, type PrimitiveInputError } from '../../../../primitive';
import type { ColorChannelLiteral } from '../types';

import { normalizeColorChannelInput } from './normalizeColorChannelInput';

describe('normalizeColorChannelInput()', () => {
    const channelDef = mockChannelDefinition;
    const channelFallback = { value: channelDef.fallback };

    describe('When input is a valid object', () => {
        const mockInput = { value: 0.3 };
        const [mockPrimitiveContext] = createPrimitiveContextMock(mockInput);

        it('should return the input as is', () => {
            const result = normalizeColorChannelInput(channelDef, mockPrimitiveContext);
            expect(result).toEqual(mockInput);
        });
    });

    describe('When input is an object with an invalid value', () => {
        const mockInput = { value: '0.3' } as unknown;
        const [mockPrimitiveContext, { addErrorSpy }] = createPrimitiveContextMock(
            mockInput as ColorChannelLiteral,
        );

        it('should return the fallback value', () => {
            const result = normalizeColorChannelInput(channelDef, mockPrimitiveContext);
            expect(result).toEqual(channelFallback);
        });

        it('should add an error to the context', () => {
            normalizeColorChannelInput(channelDef, mockPrimitiveContext);

            expect(addErrorSpy).toHaveBeenCalled();

            const error = addErrorSpy.mock.calls[0][0] as PrimitiveInputError;
            expect(error.name).toEqual(ERROR_P_INPUT);
            expect(error.primitiveName).toEqual('ColorChannel');
            expect(error.input).toEqual(mockInput);
            expect(error.context).toEqual(mockPrimitiveContext);
            expect(error.message()).toContain('Invalid ColorChannelObjectLiteral');
        });
    });

    describe('When input is a number', () => {
        const mockInput = 0.3;
        const [mockPrimitiveContext] = createPrimitiveContextMock(mockInput);

        it('should return a literal object', () => {
            const result = normalizeColorChannelInput(channelDef, mockPrimitiveContext);
            expect(result).toEqual({ value: mockInput });
        });
    });

    describe('When input is invalid', () => {
        const invalidInputs = [
            null,
            undefined,
            true,
            false,
            'string',
            { value: 'not-a-number' },
            { value: NaN },
            { unit: 'px' },
            {},
        ];

        it.each(invalidInputs)(
            'should return the fallback value for invalid input: %s',
            invalidInput => {
                const [mockPrimitiveContext] = createPrimitiveContextMock(
                    invalidInput as unknown as ColorChannelLiteral,
                );
                const result = normalizeColorChannelInput(channelDef, mockPrimitiveContext);
                expect(result).toEqual(channelFallback);
            },
        );
        it.each(invalidInputs)(
            'should add an error to the context for invalid input: %s',
            invalidInput => {
                const [mockPrimitiveContext, { addErrorSpy }] = createPrimitiveContextMock(
                    invalidInput as unknown as ColorChannelLiteral,
                );
                normalizeColorChannelInput(channelDef, mockPrimitiveContext);
                expect(addErrorSpy).toHaveBeenCalledOnce();

                const expectedReason =
                    typeof invalidInput === 'object' && invalidInput !== null
                        ? 'Invalid ColorChannelObjectLiteral'
                        : 'Invalid ColorChannelLiteral';
                const error = addErrorSpy.mock.calls[0][0] as PrimitiveInputError;
                expect(error.name).toEqual(ERROR_P_INPUT);
                expect(error.primitiveName).toEqual('ColorChannel');
                expect(error.input).toEqual(invalidInput);
                expect(error.context).toEqual(mockPrimitiveContext);
                expect(error.message()).toContain(expectedReason);
            },
        );
    });
});
