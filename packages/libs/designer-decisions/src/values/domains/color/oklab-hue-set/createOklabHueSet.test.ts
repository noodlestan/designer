import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { OklabHueValue } from '../types';

import { createOklabHueSet } from './createOklabHueSet';

vi.mock('../../../base');

describe('createOklabChromaScale()', () => {
    const mockInputs: OklabHueValue[] = [];
    const mockContext = {} as ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createOklabHueSet(mockContext, mockInputs);
        expect(createBaseSet).toHaveBeenCalledWith(mockContext, mockInputs);
    });
});
