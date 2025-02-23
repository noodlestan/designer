import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import { type OklabChromaValue } from '../types';

import { createOklabChromaScale } from './createOklabChromaScale';

vi.mock('../../../base');

describe('createOklabChromaScale()', () => {
    const mockInputs: OklabChromaValue[] = [];
    const mockContext = {} as ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createOklabChromaScale(mockContext, mockInputs);
        expect(createBaseSet).toHaveBeenCalledWith(mockContext, mockInputs);
    });
});
