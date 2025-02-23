import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeObjectLiteral } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_DEFINITION } from './private';
import { resolveFontSizeValue } from './resolveFontSizeValue';

vi.mock('../../../base', () => ({
    resolveSizeBaseValue: vi.fn(),
}));

const resolveSizeBaseValueMocked = vi.mocked(resolveSizeBaseValue);

describe('resolveFontSizeValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const mockInput = { value: 123.371, units: 'rem' } as SizeObjectLiteral;

    let mockContext: ValueContext;

    beforeEach(() => {
        mockContext = createValueContext(mockDecisionContext);
        vi.clearAllMocks();
        resolveSizeBaseValueMocked.mockReturnValue(mockInput);
    });

    describe('Given a value', () => {
        it('should call resolveSizeBaseValue()', () => {
            resolveFontSizeValue(mockContext, mockInput);

            expect(resolveSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_DEFINITION,
                mockContext,
                mockInput,
            );
        });

        it('should return the resolved value', () => {
            const result = resolveFontSizeValue(mockContext, mockInput);

            expect(result).toBe(mockInput);
        });
    });
});
