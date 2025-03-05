import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeValueInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { NumberFormatOptions } from '../../../../primitives';
import { type SizeBaseValue, createSizeBaseValue } from '../../../base';

import { createFontSizeValue } from './createFontSizeValue';
import { SIZE_VALUE_DEFINITION } from './private';

vi.mock('../../../base');

const createSizeBaseValueMocked = vi.mocked(createSizeBaseValue);

describe('createFontSizeValue()', () => {
    const mockInput = { value: 123.371, units: 'rem' } as SizeValueInput;
    const [mockValueContext] = createValueContextMock();
    const sizeBaseValueMock = { type: () => 'foo' } as SizeBaseValue;
    const mockOptions = {} as NumberFormatOptions;

    beforeEach(() => {
        vi.clearAllMocks();
        createSizeBaseValueMocked.mockReturnValue(sizeBaseValueMock);
    });

    describe('Given a context, an input, and options', () => {
        it('should have called createFontSizeValue()', () => {
            createFontSizeValue(mockValueContext, mockInput, mockOptions);

            expect(createSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_VALUE_DEFINITION,
                mockValueContext,
                mockInput,
                mockOptions,
            );
        });

        it('should return the created SizeBaseValue', () => {
            const result = createFontSizeValue(mockValueContext, mockInput);

            expect(result).toBe(sizeBaseValueMock);
        });
    });
});
