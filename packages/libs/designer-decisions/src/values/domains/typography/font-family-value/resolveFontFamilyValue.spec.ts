import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { FontFamilyArrayLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';

import { resolveFontFamilyValue } from './resolveFontFamilyValue';
import { resolveFontFamilyValueRef } from './resolveFontFamilyValueRef';

vi.mock('./resolveFontFamilyValueRef');

const resolveFontFamilyValueRefMock = vi.mocked(resolveFontFamilyValueRef);

describe('resolveFontFamilyValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const [mockValueContext] = createValueContextMock(mockInput);

        const resolvedValue: FontFamilyArrayLiteral = ['Foo', 'Bar'];

        beforeEach(() => {
            resolveFontFamilyValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveFontFamilyValueRef with the expected arguments', () => {
            resolveFontFamilyValue(mockValueContext);

            expect(resolveFontFamilyValueRefMock).toHaveBeenCalledOnce();
            expect(resolveFontFamilyValueRefMock).toHaveBeenCalledWith(mockValueContext, mockInput);
        });

        it('should return the value resolved by resolveFontFamilyValueRef', () => {
            const result = resolveFontFamilyValue(mockValueContext);

            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveFontFamilyValue(mockValueContext);
            expect(result).toEqual(undefined);
        });
    });

    describe('When input is something else', () => {
        const mockInput: FontFamilyArrayLiteral = ['Foo', 'Bar'];
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveFontFamilyValue(mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
