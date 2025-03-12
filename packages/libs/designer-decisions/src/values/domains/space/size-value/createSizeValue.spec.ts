import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SizeInput } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';
import type { NumberFormatOptions } from '../../../../primitives';
import { type SizeBaseValue, createSizeBaseValue } from '../../../base';

import { createSizeValue } from './createSizeValue';
import { SIZE_DEFINITION } from './private';

vi.mock('../../../base');

const createSizeBaseValueMocked = vi.mocked(createSizeBaseValue);

describe('createSizeValue()', () => {
    const mockInput = { value: 123.371, units: 'rem' } as SizeInput;
    const [mockValueContext] = createValueContextMock(mockInput);
    const sizeBaseValueMock = { type: () => 'foo' } as SizeBaseValue;
    const mockOptions = {} as NumberFormatOptions;

    beforeEach(() => {
        vi.clearAllMocks();
        createSizeBaseValueMocked.mockReturnValue(sizeBaseValueMock);
    });

    describe('Given a context, an input, and options', () => {
        it('should have called createSizeValue()', () => {
            createSizeValue(mockValueContext, mockOptions);

            expect(createSizeBaseValueMocked).toHaveBeenCalledWith(
                SIZE_DEFINITION,
                mockValueContext,
                mockOptions,
            );
        });

        it('should return the created SizeBaseValue', () => {
            const result = createSizeValue(mockValueContext);
            expect(result).toBe(sizeBaseValueMock);
        });
    });
});
