import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { FontWeightLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { ValueInputError } from '../../../../value';
import type { FontWeight } from '../../../primitives';

import { FALLBACK_VALUE } from './private';
import { resolveFontWeightValue } from './resolveFontWeightValue';
import { resolveFontWeightValueRef } from './resolveFontWeightValueRef';

vi.mock('./resolveFontWeightValueRef');

const resolveFontWeightValueRefMock = vi.mocked(resolveFontWeightValueRef);

describe('resolveFontWeightValue()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue: FontWeight = FALLBACK_VALUE;

        beforeEach(() => {
            resolveFontWeightValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveFontWeightValueRef with the correct arguments', () => {
            resolveFontWeightValue(mockContext, mockInput);

            expect(resolveFontWeightValueRefMock).toHaveBeenCalledOnce();
            expect(resolveFontWeightValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveFontWeightValueRef', () => {
            const result = resolveFontWeightValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const mockInput = {};

        it('should return the fallback value', () => {
            const result = resolveFontWeightValue(mockContext, mockInput);
            expect(result.value).toEqual(FALLBACK_VALUE.value);
        });
    });

    describe('When input is a number', () => {
        const mockInput = 300;

        it('should return the resolved value', () => {
            const result = resolveFontWeightValue(mockContext, mockInput);
            expect(result.value).toEqual(300);
            expect(result.toString()).toEqual('300');
            expect(result.named()).toEqual(undefined);
        });
    });

    describe('When input is a string', () => {
        const mockInput = 'Thin';

        it('should return the resolved value', () => {
            const result = resolveFontWeightValue(mockContext, mockInput);
            expect(result.value).toEqual(100);
            expect(result.toString()).toEqual('Thin');
            expect(result.named()).toEqual('Thin');
        });
    });

    describe('When input is invalid', () => {
        const invalidInput = 'Foo' as unknown as FontWeightLiteral;

        it('should add an error to the context;', () => {
            resolveFontWeightValue(mockContext, invalidInput);

            expect(addErrorSpy).toHaveBeenCalledTimes(1);
            const error1 = addErrorSpy.mock.calls[0][0] as ValueInputError;
            expect(error1.message()).toContain('Invalid input data');
            expect(error1.message()).toContain('font-weight-value');
            expect(error1.message()).toContain('Foo');
            expect(error1.input).toEqual('Foo');
        });

        it('should return the fallback value', () => {
            const result = resolveFontWeightValue(mockContext, invalidInput);

            expect(result.toString()).toEqual('400');
        });
    });
});
