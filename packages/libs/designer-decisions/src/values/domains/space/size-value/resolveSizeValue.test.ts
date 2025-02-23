import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeObjectLiteral, SizeValueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ValueInputError } from '../../../../value';

import { FALLBACK_VALUE } from './private';
import { resolveSizeValue } from './resolveSizeValue';
import { resolveSizeValueRef } from './resolveSizeValueRef';

vi.mock('./resolveSizeValueRef');

const resolveSizeValueRefMock = vi.mocked(resolveSizeValueRef);

describe('resolveSizeValue()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue: SizeObjectLiteral = { value: 42, units: 'px' };

        beforeEach(() => {
            resolveSizeValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveSizeValueRef with the correct arguments', () => {
            resolveSizeValue(mockContext, mockInput);

            expect(resolveSizeValueRefMock).toHaveBeenCalledOnce();
            expect(resolveSizeValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveSizeValueRef', () => {
            const result = resolveSizeValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a string', () => {
        const mockInput = '24';

        it('should return a SizeObjectLiteral object with the value parsed as a number and "px" as the units', () => {
            const result = resolveSizeValue(mockContext, mockInput);
            expect(result.value).toEqual(24);
            expect(result.units).toEqual('px');
        });
    });

    describe('When input is a number', () => {
        const mockInput = 12;

        it('should return a SizeObjectLiteral object with the value and "px" as the units', () => {
            const result = resolveSizeValue(mockContext, mockInput);
            expect(result.value).toEqual(12);
            expect(result.units).toEqual('px');
        });
    });

    describe('When input is already a SizeObjectLiteral object', () => {
        const mockInput: SizeObjectLiteral = { value: 10, units: 'px' };

        it('should return the input as-is', () => {
            const result = resolveSizeValue(mockContext, mockInput);
            expect(result).toEqual(mockInput);
        });
    });

    describe('When the input is invalid', () => {
        const invalidInputs = [
            null,
            undefined,
            true,
            false,
            { value: 'not-a-number', units: 'px' },
            { value: 12, units: 'em' },
            { units: 'px' },
            { value: 10 },
            'invalid-string',
        ] as unknown[];

        it.each(invalidInputs)(
            'should return the fallback value for invalid input: %s',
            invalidInput => {
                const result = resolveSizeValue(mockContext, invalidInput as SizeValueInput);
                expect(result).toEqual(FALLBACK_VALUE);
            },
        );
        it.each(invalidInputs)(
            'should add an error to the context for invalid input: %s',
            invalidInput => {
                resolveSizeValue(mockContext, invalidInput as SizeValueInput);

                expect(addErrorSpy).toHaveBeenCalledOnce();
                const error = addErrorSpy.mock.calls[0][0] as ValueInputError;
                expect(error.message()).toContain('Invalid input data');
                expect(error.input).toEqual(invalidInput);
            },
        );
    });
});
