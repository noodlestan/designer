import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { ColorValue } from '../types';

import { createColorSet } from './createColorSet';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createColorSet()', () => {
    const mockInputs: ColorValue[] = [];
    const [mockValueContext] = createValueContextMock(mockInputs);

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the value context', () => {
        createColorSet(mockValueContext);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext);
    });

    it('should return the BaseSet', () => {
        const result = createColorSet(mockValueContext);
        expect(result).toBe(mockBaseSet);
    });
});
