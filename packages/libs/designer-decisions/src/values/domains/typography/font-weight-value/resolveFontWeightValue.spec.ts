import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { FontWeightObjectLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';

import { resolveFontWeightValue } from './resolveFontWeightValue';
import { resolveFontWeightValueRef } from './resolveFontWeightValueRef';

vi.mock('./resolveFontWeightValueRef');

const resolveFontWeightValueRefMock = vi.mocked(resolveFontWeightValueRef);

describe('resolveFontWeightValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const [mockValueContext] = createValueContextMock(mockInput);

        const resolvedValue: FontWeightObjectLiteral = { value: 900 };

        beforeEach(() => {
            resolveFontWeightValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveFontWeightValueRef with the expected arguments', () => {
            resolveFontWeightValue(mockValueContext);

            expect(resolveFontWeightValueRefMock).toHaveBeenCalledOnce();
            expect(resolveFontWeightValueRefMock).toHaveBeenCalledWith(mockValueContext, mockInput);
        });

        it('should return the value resolved by resolveFontWeightValueRef', () => {
            const result = resolveFontWeightValue(mockValueContext);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveFontWeightValue(mockValueContext);
            expect(result).toEqual(undefined);
        });
    });

    describe('When input is something else', () => {
        const mockInput = 900;
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveFontWeightValue(mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
