import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { OklabLightnessValue } from '../types';

import { createOklabLightnessScale } from './createOklabLightnessScale';

vi.mock('../../../base');

describe('createOklabLightnessScale()', () => {
    const mockInputs: OklabLightnessValue[] = [];
    const mockContext = {} as ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createOklabLightnessScale(mockContext, mockInputs);
        expect(createBaseSet).toHaveBeenCalledWith(mockContext, mockInputs);
    });
});
