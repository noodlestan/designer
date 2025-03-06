import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { SRGBLightnessValue } from '../types';

import { createSRGBLightnessScale } from './createSRGBLightnessScale';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createSRGBLightnessScale()', () => {
    const mockInputs: SRGBLightnessValue[] = [];
    const [mockValueContext] = createValueContextMock(mockInputs);

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the value context', () => {
        createSRGBLightnessScale(mockValueContext);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext);
    });

    it('should return the BaseSet', () => {
        const result = createSRGBLightnessScale(mockValueContext);
        expect(result).toBe(mockBaseSet);
    });
});
