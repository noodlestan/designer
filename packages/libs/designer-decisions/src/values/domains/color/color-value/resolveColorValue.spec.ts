import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorObjectLiteral, ColorOkLCHLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';

import { resolveColorValue } from './resolveColorValue';
import { resolveColorValueRef } from './resolveColorValueRef';

vi.mock('./resolveColorValueRef');

const resolveColorValueRefMock = vi.mocked(resolveColorValueRef);

describe('resolveColorValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue: ColorOkLCHLiteral = { l: 0.6, c: 0.15, h: 333 };
        const [mockValueContext] = createValueContextMock(mockInput);

        beforeEach(() => {
            resolveColorValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveColorValueRef with the expected arguments', () => {
            resolveColorValue(mockValueContext);

            expect(resolveColorValueRefMock).toHaveBeenCalledOnce();
            expect(resolveColorValueRefMock).toHaveBeenCalledWith(mockValueContext, mockInput);
        });

        it('should return the value resolved by resolveColorValueRef', () => {
            const result = resolveColorValue(mockValueContext);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveColorValue(mockValueContext);
            expect(result).toEqual(undefined);
        });
    });

    describe('When input is something else', () => {
        const mockInput: ColorObjectLiteral = { h: 123.371, s: 0.4, l: 0.5 };
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveColorValue(mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
