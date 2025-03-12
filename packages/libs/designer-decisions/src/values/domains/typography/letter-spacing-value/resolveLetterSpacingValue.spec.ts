import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeInput, SizeLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_VALUE_DEFINITION } from './private';
import { resolveLetterSpacingValue } from './resolveLetterSpacingValue';

vi.mock('../../../base');

const resolveSizeBaseValueMocked = vi.mocked(resolveSizeBaseValue);

describe('resolveLetterSpacingValue()', () => {
    const mockInput = { value: 123.371, units: 'rem' } as SizeInput;
    const [mockValueContext] = createValueContextMock(mockInput);

    const resolvedValue = { value: 33 } as SizeLiteral;

    beforeEach(() => {
        vi.clearAllMocks();
        resolveSizeBaseValueMocked.mockReturnValue(resolvedValue);
    });

    describe('Given a context and an input', () => {
        it('should have called resolveSizeBaseValue()', () => {
            resolveLetterSpacingValue(mockValueContext);

            expect(resolveSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_VALUE_DEFINITION,
                mockValueContext,
            );
        });

        it('should return the resolved sizeLiteralMock', () => {
            const result = resolveLetterSpacingValue(mockValueContext);
            expect(result).toBe(resolvedValue);
        });
    });
});
