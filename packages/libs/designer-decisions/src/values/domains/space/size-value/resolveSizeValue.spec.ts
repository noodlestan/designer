import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeInput, SizeLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_DEFINITION } from './private';
import { resolveSizeValue } from './resolveSizeValue';

vi.mock('../../../base');

const resolveSizeBaseValueMocked = vi.mocked(resolveSizeBaseValue);

describe('resolveSizeValue()', () => {
    const mockInput = { value: 123.371, units: 'rem' } as SizeInput;
    const [mockValueContext] = createValueContextMock(mockInput);

    const sizeLiteralMock = { value: 33 } as SizeLiteral;

    beforeEach(() => {
        vi.clearAllMocks();
        resolveSizeBaseValueMocked.mockReturnValue(sizeLiteralMock);
    });

    describe('Given a context and an input', () => {
        it('should have called resolveSizeBaseValue()', () => {
            resolveSizeValue(mockValueContext);

            expect(resolveSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_DEFINITION,
                mockValueContext,
            );
        });

        it('should return the resolved sizeLiteralMock', () => {
            const result = resolveSizeValue(mockValueContext);
            expect(result).toBe(sizeLiteralMock);
        });
    });
});
