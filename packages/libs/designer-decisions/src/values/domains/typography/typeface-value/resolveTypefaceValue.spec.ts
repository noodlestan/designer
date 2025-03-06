import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { TypefaceObjectLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';

import { resolveTypefaceValue } from './resolveTypefaceValue';
import { resolveTypefaceValueRef } from './resolveTypefaceValueRef';

vi.mock('./resolveTypefaceValueRef');

const resolveTypefaceValueRefMock = vi.mocked(resolveTypefaceValueRef);

describe('resolveTypefaceValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const [mockValueContext] = createValueContextMock(mockInput);

        const resolvedValue: TypefaceObjectLiteral = {
            fontName: 'Georgia',
            capabilities: [],
            styles: [],
            ranges: [],
        };

        beforeEach(() => {
            resolveTypefaceValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveTypefaceValueRef with the expected arguments', () => {
            resolveTypefaceValue(mockValueContext);

            expect(resolveTypefaceValueRefMock).toHaveBeenCalledOnce();
            expect(resolveTypefaceValueRefMock).toHaveBeenCalledWith(mockValueContext, mockInput);
        });

        it('should return the value resolved by resolveTypefaceValueRef', () => {
            const result = resolveTypefaceValue(mockValueContext);

            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveTypefaceValue(mockValueContext);
            expect(result).toEqual(undefined);
        });
    });

    describe('When input is something else', () => {
        const mockInput: TypefaceObjectLiteral = { fontName: 'Foo' };
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveTypefaceValue(mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
