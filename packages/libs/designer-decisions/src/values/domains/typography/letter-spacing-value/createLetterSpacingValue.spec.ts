import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeValueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { NumberFormatOptions } from '../../../../primitives';
import { type SizeBaseValue, createSizeBaseValue } from '../../../base';

import { createLetterSpacingValue } from './createLetterSpacingValue';
import { SIZE_VALUE_DEFINITION } from './private';

vi.mock('../../../base');

const createSizeBaseValueMocked = vi.mocked(createSizeBaseValue);

describe('createLetterSpacingValue()', () => {
    const mockInput = { value: 123.371, units: 'rem' } as SizeValueInput;
    const [mockValueContext] = createValueContextMock(mockInput);

    const sizeBaseValueMock = { type: () => 'foo' } as SizeBaseValue;
    const mockOptions = {} as NumberFormatOptions;

    beforeEach(() => {
        vi.clearAllMocks();
        createSizeBaseValueMocked.mockReturnValue(sizeBaseValueMock);
    });

    describe('Given a context, an input, and options', () => {
        it('should have called createLetterSpacingValue()', () => {
            createLetterSpacingValue(mockValueContext, mockOptions);

            expect(createSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_VALUE_DEFINITION,
                mockValueContext,
                mockOptions,
            );
        });

        it('should return the created SizeBaseValue', () => {
            const result = createLetterSpacingValue(mockValueContext);
            expect(result).toBe(sizeBaseValueMock);
        });
    });
});
