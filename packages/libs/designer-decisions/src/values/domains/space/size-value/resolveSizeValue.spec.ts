import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeLiteral, SizeValueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_DEFINITION } from './private';
import { resolveSizeValue } from './resolveSizeValue';

vi.mock('../../../base');

const resolveSizeBaseValueMocked = vi.mocked(resolveSizeBaseValue);

describe('resolveSizeValue()', () => {
    const mockInput = { value: 123.371, units: 'rem' } as SizeValueInput;
    const [mockValueContext] = createValueContextMock();
    const sizeLiteralMock = { value: 33 } as SizeLiteral;

    beforeEach(() => {
        vi.clearAllMocks();
        resolveSizeBaseValueMocked.mockReturnValue(sizeLiteralMock);
    });

    describe('Given a context and an input', () => {
        it('should have called resolveSizeBaseValue()', () => {
            resolveSizeValue(mockValueContext, mockInput);

            expect(resolveSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_DEFINITION,
                mockValueContext,
                mockInput,
            );
        });

        it('should return the resolved sizeLiteralMock', () => {
            const result = resolveSizeValue(mockValueContext, mockInput);

            expect(result).toBe(sizeLiteralMock);
        });
    });
});
