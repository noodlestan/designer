import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import type { OklabLightnessValue } from '../types';

import { createOklabLightnessScale } from './createOklabLightnessScale';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createOklabLightnessScale()', () => {
    const mockInputs: OklabLightnessValue[] = [];
    const [mockValueContext] = createValueContextMock(mockInputs);

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the value context', () => {
        createOklabLightnessScale(mockValueContext);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext);
    });

    it('should return the BaseSet', () => {
        const result = createOklabLightnessScale(mockValueContext);
        expect(result).toBe(mockBaseSet);
    });
});
