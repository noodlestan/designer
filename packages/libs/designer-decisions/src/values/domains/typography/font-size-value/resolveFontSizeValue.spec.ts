import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeLiteral, SizeValueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_VALUE_DEFINITION } from './private';
import { resolveFontSizeValue } from './resolveFontSizeValue';

vi.mock('../../../base');

const resolveSizeBaseValueMocked = vi.mocked(resolveSizeBaseValue);

describe('resolveFontSizeValue()', () => {
    const mockInput = { value: 123.371, units: 'rem' } as SizeValueInput;
    const [mockValueContext] = createValueContextMock(mockInput);

    const resolvedValue = { value: 33 } as SizeLiteral;

    beforeEach(() => {
        vi.clearAllMocks();
        resolveSizeBaseValueMocked.mockReturnValue(resolvedValue);
    });

    describe('Given a context and an input', () => {
        it('should have called resolveSizeBaseValue()', () => {
            resolveFontSizeValue(mockValueContext);

            expect(resolveSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_VALUE_DEFINITION,
                mockValueContext,
            );
        });

        it('should return the resolved sizeLiteralMock', () => {
            const result = resolveFontSizeValue(mockValueContext);
            expect(result).toBe(resolvedValue);
        });
    });
});
