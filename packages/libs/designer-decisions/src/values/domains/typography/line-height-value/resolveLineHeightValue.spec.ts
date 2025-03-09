import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { LineHeightObjectLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';

import { resolveLineHeightValue } from './resolveLineHeightValue';
import { resolveLineHeightValueRef } from './resolveLineHeightValueRef';

vi.mock('./resolveLineHeightValueRef');

const resolveLineHeightValueRefMock = vi.mocked(resolveLineHeightValueRef);

describe('resolveLineHeightValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const [mockValueContext] = createValueContextMock(mockInput);

        const resolvedValue: LineHeightObjectLiteral = { value: 900 };

        beforeEach(() => {
            resolveLineHeightValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveLineHeightValueRef with the expected arguments', () => {
            resolveLineHeightValue(mockValueContext);

            expect(resolveLineHeightValueRefMock).toHaveBeenCalledOnce();
            expect(resolveLineHeightValueRefMock).toHaveBeenCalledWith(mockValueContext, mockInput);
        });

        it('should return the value resolved by resolveLineHeightValueRef', () => {
            const result = resolveLineHeightValue(mockValueContext);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveLineHeightValue(mockValueContext);
            expect(result).toEqual(undefined);
        });
    });

    describe('When input is something else', () => {
        const mockInput = 900;
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveLineHeightValue(mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
