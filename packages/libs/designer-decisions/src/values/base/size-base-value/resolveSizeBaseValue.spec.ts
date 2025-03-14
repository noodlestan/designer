import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeObjectLiteral } from '../../../inputs';
import { createValueContextMock, mockSizeDefinition } from '../../../mocks';

import { resolveSizeBaseValue } from './resolveSizeBaseValue';
import { resolveSizeBaseValueRef } from './resolveSizeBaseValueRef';

vi.mock('./resolveSizeBaseValueRef');

const resolveSizeBaseValueRefMock = vi.mocked(resolveSizeBaseValueRef);

describe('resolveSizeBaseValue()', () => {
    const sizeDef = mockSizeDefinition;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const [mockValueContext] = createValueContextMock(mockInput);

        const resolvedValue: SizeObjectLiteral = { value: 42, unit: 'px' };

        beforeEach(() => {
            resolveSizeBaseValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveSizeValueRef with the expected arguments', () => {
            resolveSizeBaseValue(sizeDef, mockValueContext);

            expect(resolveSizeBaseValueRefMock).toHaveBeenCalledOnce();
            expect(resolveSizeBaseValueRefMock).toHaveBeenCalledWith(
                sizeDef,
                mockValueContext,
                mockInput,
            );
        });

        it('should return the value resolved by resolveSizeValueRef', () => {
            const result = resolveSizeBaseValue(sizeDef, mockValueContext);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveSizeBaseValue(sizeDef, mockValueContext);
            expect(result).toEqual(undefined);
        });
    });

    describe('When input is something else', () => {
        const mockInput: SizeObjectLiteral = { value: 10, unit: 'px' };
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveSizeBaseValue(sizeDef, mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
