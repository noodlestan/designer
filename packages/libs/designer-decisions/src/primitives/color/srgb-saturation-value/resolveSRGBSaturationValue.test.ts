import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionValueInputError } from '../../../types';
import { createValueContextMock } from '../../mocks';

import { FALLBACK_VALUE } from './private';
import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';
import { resolveSRGBSaturationValueRef } from './resolveSRGBSaturationValueRef';

vi.mock('./resolveSRGBSaturationValueRef');

const resolveSRGBSaturationValueRefMock = vi.mocked(resolveSRGBSaturationValueRef);

describe('resolveSRGBSaturationValue', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue = 0.3;

        beforeEach(() => {
            resolveSRGBSaturationValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveSRGBSaturationValueRef with the correct arguments', () => {
            resolveSRGBSaturationValue(mockContext, mockInput);

            expect(resolveSRGBSaturationValueRefMock).toHaveBeenCalledOnce();
            expect(resolveSRGBSaturationValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveSRGBSaturationValueRef', () => {
            const result = resolveSRGBSaturationValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a normal number', () => {
        const mockInput = 0.3;

        it('should return the input value', () => {
            const result = resolveSRGBSaturationValue(mockContext, mockInput);
            expect(result).toEqual(0.3);
        });
    });

    describe('When input is an out bounds number', () => {
        const mockInput = 999;

        it('should return the clamped input value', () => {
            const result = resolveSRGBSaturationValue(mockContext, mockInput);
            expect(result).toEqual(1);
        });
    });

    describe('When input is invalid', () => {
        const invalidInputs = [null, undefined, true, false, { value: 10 }, '24'] as unknown[];

        it.each(invalidInputs)(
            'should return the fallback value for invalid input: %s',
            invalidInput => {
                const result = resolveSRGBSaturationValue(mockContext, invalidInput as number);
                expect(result).toEqual(FALLBACK_VALUE);
            },
        );
        it.each(invalidInputs)(
            'should add an error to the context for invalid input: %s',
            invalidInput => {
                resolveSRGBSaturationValue(mockContext, invalidInput as number);

                expect(addErrorSpy).toHaveBeenCalledOnce();
                const error = addErrorSpy.mock.calls[0][0] as DecisionValueInputError;
                expect(error.message()).toContain('Invalid input data');
                expect(error.input).toEqual(invalidInput);
            },
        );
    });
});
