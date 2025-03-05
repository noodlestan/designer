import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { ColorValue } from '../types';

import { createColorSet } from './createColorSet';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createColorSet()', () => {
    const mockInputs: ColorValue[] = [];
    const [mockValueContext] = createValueContextMock();

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createColorSet(mockValueContext, mockInputs);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext, mockInputs);
    });

    it('should return the BaseSet', () => {
        const result = createColorSet(mockValueContext, mockInputs);
        expect(result).toBe(mockBaseSet);
    });
});
