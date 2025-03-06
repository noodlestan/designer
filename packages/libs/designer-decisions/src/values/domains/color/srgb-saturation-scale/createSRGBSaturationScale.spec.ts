import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { SRGBSaturationValue } from '../types';

import { createSRGBSaturationScale } from './createSRGBSaturationScale';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createSRGBSaturationScale()', () => {
    const mockInputs: SRGBSaturationValue[] = [];
    const [mockValueContext] = createValueContextMock(mockInputs);

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the value context', () => {
        createSRGBSaturationScale(mockValueContext);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext);
    });

    it('should return the BaseSet', () => {
        const result = createSRGBSaturationScale(mockValueContext);
        expect(result).toBe(mockBaseSet);
    });
});
