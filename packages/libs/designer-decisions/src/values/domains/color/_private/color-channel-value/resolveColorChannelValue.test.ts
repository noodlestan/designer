import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../../mocks';
import type { ValueInputError } from '../../../../../value';

import { FALLBACK_VALUE } from './private';
import { resolveColorChannelValue } from './resolveColorChannelValue';
import { resolveColorChannelValueRef } from './resolveColorChannelValueRef';

vi.mock('./resolveColorChannelValueRef');

const resolveColorChannelValueRefMock = vi.mocked(resolveColorChannelValueRef);

describe('resolveColorChannelValue()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue = 0.3;

        beforeEach(() => {
            resolveColorChannelValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveColorChannelValueRef with the correct arguments', () => {
            resolveColorChannelValue(mockContext, mockInput);

            expect(resolveColorChannelValueRefMock).toHaveBeenCalledOnce();
            expect(resolveColorChannelValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveColorChannelValueRef', () => {
            const result = resolveColorChannelValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a normal number', () => {
        const mockInput = 0.3;

        it('should return the input value', () => {
            const result = resolveColorChannelValue(mockContext, mockInput);
            expect(result).toEqual(0.3);
        });
    });

    describe('When input is out bounds', () => {
        const mockInput = 999;

        it('should return not clamp the value', () => {
            const result = resolveColorChannelValue(mockContext, mockInput);
            expect(result).toEqual(999);
        });
    });

    describe('When input is invalid', () => {
        const invalidInputs = [null, undefined, true, false, { value: 10 }, '24'] as unknown[];

        it.each(invalidInputs)(
            'should return the fallback value for invalid input: %s',
            invalidInput => {
                const result = resolveColorChannelValue(mockContext, invalidInput as number);
                expect(result).toEqual(FALLBACK_VALUE);
            },
        );
        it.each(invalidInputs)(
            'should add an error to the context for invalid input: %s',
            invalidInput => {
                resolveColorChannelValue(mockContext, invalidInput as number);

                expect(addErrorSpy).toHaveBeenCalledOnce();
                const error = addErrorSpy.mock.calls[0][0] as ValueInputError;
                expect(error.message()).toContain('Invalid input data');
                expect(error.input).toEqual(invalidInput);
            },
        );
    });
});
