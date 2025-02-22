import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import { SRGBLightnessValue } from '../../../primitives';

import { createSRGBLightnessScale } from './createSRGBLightnessScale';

vi.mock('../../../base');

describe('createSRGBLightnessScale()', () => {
    const mockInputs: SRGBLightnessValue[] = [];
    const mockContext = {} as ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createSRGBLightnessScale(mockContext, mockInputs);
        expect(createBaseSet).toHaveBeenCalledWith(mockContext, mockInputs);
    });
});
