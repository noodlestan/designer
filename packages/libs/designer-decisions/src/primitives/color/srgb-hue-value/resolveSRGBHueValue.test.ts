import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { DecisionValueInputError } from '../../../types';

import { FALLBACK_VALUE } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';
import { resolveSRGBHueValueRef } from './resolveSRGBHueValueRef';

vi.mock('./resolveSRGBHueValueRef');

const resolveSRGBHueValueRefMock = vi.mocked(resolveSRGBHueValueRef);

describe('resolveSRGBHueValue()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue = 0.3;

        beforeEach(() => {
            resolveSRGBHueValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveSRGBHueValueRef with the correct arguments', () => {
            resolveSRGBHueValue(mockContext, mockInput);

            expect(resolveSRGBHueValueRefMock).toHaveBeenCalledOnce();
            expect(resolveSRGBHueValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveSRGBHueValueRef', () => {
            const result = resolveSRGBHueValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a normal number', () => {
        const mockInput = 0.3;

        it('should return the input value', () => {
            const result = resolveSRGBHueValue(mockContext, mockInput);
            expect(result).toEqual(0.3);
        });
    });

    describe('When input is an out bounds number', () => {
        const mockInput = 999;

        it('should return the clamped input value', () => {
            const result = resolveSRGBHueValue(mockContext, mockInput);
            expect(result).toEqual(360);
        });
    });

    describe('When input is invalid', () => {
        const invalidInputs = [null, undefined, true, false, { value: 10 }, '24'] as unknown[];

        it.each(invalidInputs)(
            'should return the fallback value for invalid input: %s',
            invalidInput => {
                const result = resolveSRGBHueValue(mockContext, invalidInput as number);
                expect(result).toEqual(FALLBACK_VALUE);
            },
        );
        it.each(invalidInputs)(
            'should add an error to the context for invalid input: %s',
            invalidInput => {
                resolveSRGBHueValue(mockContext, invalidInput as number);

                expect(addErrorSpy).toHaveBeenCalledOnce();
                const error = addErrorSpy.mock.calls[0][0] as DecisionValueInputError;
                expect(error.message()).toContain('Invalid input data');
                expect(error.input).toEqual(invalidInput);
            },
        );
    });
});
