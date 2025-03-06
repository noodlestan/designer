import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { OklabHueValue } from '../types';

import { createOklabHueSet } from './createOklabHueSet';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createOklabChromaScale()', () => {
    const mockInputs: OklabHueValue[] = [];
    const [mockValueContext] = createValueContextMock(mockInputs);

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the value context', () => {
        createOklabHueSet(mockValueContext);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext);
    });

    it('should return the BaseSet', () => {
        const result = createOklabHueSet(mockValueContext);
        expect(result).toBe(mockBaseSet);
    });
});
