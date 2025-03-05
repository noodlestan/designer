import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { SizeValue } from '../types';

import { createSizeScale } from './createSizeScale';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createSizeScale()', () => {
    const mockInputs: SizeValue[] = [];
    const [mockValueContext] = createValueContextMock();

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createSizeScale(mockValueContext, mockInputs);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext, mockInputs);
    });

    it('should return the BaseSet', () => {
        const result = createSizeScale(mockValueContext, mockInputs);
        expect(result).toBe(mockBaseSet);
    });
});
