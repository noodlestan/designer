import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ValueInputError } from '../../../value';

import { mockChannelDefinition } from './mocks';
import { resolveColorChannelBaseValue } from './resolveColorChannelBaseValue';
import { resolveColorChannelBaseValueRef } from './resolveColorChannelBaseValueRef';

vi.mock('./resolveColorChannelBaseValueRef');

const resolveColorChannelBaseValueRefMock = vi.mocked(resolveColorChannelBaseValueRef);

describe('resolveColorChannelBaseValue()', () => {
    const channelDef = mockChannelDefinition;
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue = 0.3;

        beforeEach(() => {
            resolveColorChannelBaseValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveColorChannelBaseValueRef with the correct arguments', () => {
            resolveColorChannelBaseValue(channelDef, mockContext, mockInput);

            expect(resolveColorChannelBaseValueRefMock).toHaveBeenCalledOnce();
            expect(resolveColorChannelBaseValueRefMock).toHaveBeenCalledWith(
                channelDef,
                mockContext,
                mockInput,
            );
        });

        it('should return the value resolved by resolveColorChannelBaseValueRef', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a normal number', () => {
        const mockInput = 0.3;

        it('should return the input value', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockContext, mockInput);
            expect(result).toEqual(0.3);
        });
    });

    describe('When input is out bounds', () => {
        const mockInput = 999;

        it('should return not clamp the value', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockContext, mockInput);
            expect(result).toEqual(999);
        });
    });

    describe('When input is invalid', () => {
        const invalidInputs = [null, undefined, true, false, { value: 10 }, '24'] as unknown[];

        it.each(invalidInputs)(
            'should return the fallback value for invalid input: %s',
            invalidInput => {
                const result = resolveColorChannelBaseValue(
                    channelDef,
                    mockContext,
                    invalidInput as number,
                );
                expect(result).toEqual(channelDef.fallback);
            },
        );
        it.each(invalidInputs)(
            'should add an error to the context for invalid input: %s',
            invalidInput => {
                resolveColorChannelBaseValue(channelDef, mockContext, invalidInput as number);

                expect(addErrorSpy).toHaveBeenCalledOnce();
                const error = addErrorSpy.mock.calls[0][0] as ValueInputError;
                expect(error.message()).toContain('Invalid input data');
                expect(error.input).toEqual(invalidInput);
            },
        );
    });
});
