import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import { SRGBHueValue } from '../../../primitives';

import { createSRGBHueSet } from './createSRGBHueSet';

vi.mock('../../../base');

describe('createSRGBChromaScale()', () => {
    const mockInputs: SRGBHueValue[] = [];
    const mockContext = {} as ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createSRGBHueSet(mockContext, mockInputs);
        expect(createBaseSet).toHaveBeenCalledWith(mockContext, mockInputs);
    });
});
