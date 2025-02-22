import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import { SRGBSaturationValue } from '../../../primitives';

import { createSRGBSaturationScale } from './createSRGBSaturationScale';

vi.mock('../../../base');

describe('createSRGBSaturationScale()', () => {
    const mockInputs: SRGBSaturationValue[] = [];
    const mockContext = {} as ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createSRGBSaturationScale(mockContext, mockInputs);
        expect(createBaseSet).toHaveBeenCalledWith(mockContext, mockInputs);
    });
});
