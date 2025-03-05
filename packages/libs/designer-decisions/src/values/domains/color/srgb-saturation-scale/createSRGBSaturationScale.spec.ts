import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { SRGBSaturationValue } from '../types';

import { createSRGBSaturationScale } from './createSRGBSaturationScale';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createSRGBSaturationScale()', () => {
    const mockInputs: SRGBSaturationValue[] = [];
    const [mockValueContext] = createValueContextMock();

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createSRGBSaturationScale(mockValueContext, mockInputs);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext, mockInputs);
    });

    it('should return the BaseSet', () => {
        const result = createSRGBSaturationScale(mockValueContext, mockInputs);
        expect(result).toBe(mockBaseSet);
    });
});
