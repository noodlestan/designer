import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { SRGBHueValue } from '../types';

import { createSRGBHueSet } from './createSRGBHueSet';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createSRGBChromaScale()', () => {
    const mockInputs: SRGBHueValue[] = [];
    const [mockValueContext] = createValueContextMock();

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createSRGBHueSet(mockValueContext, mockInputs);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext, mockInputs);
    });

    it('should return the BaseSet', () => {
        const result = createSRGBHueSet(mockValueContext, mockInputs);
        expect(result).toBe(mockBaseSet);
    });
});
