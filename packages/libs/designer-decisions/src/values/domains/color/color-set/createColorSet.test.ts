import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { ColorValue } from '../types';

import { createColorSet } from './createColorSet';

vi.mock('../../../base');

describe('createColorSet()', () => {
    const mockInputs: ColorValue[] = [];
    const mockContext = {} as ValueContext;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createColorSet(mockContext, mockInputs);
        expect(createBaseSet).toHaveBeenCalledWith(mockContext, mockInputs);
    });
});
