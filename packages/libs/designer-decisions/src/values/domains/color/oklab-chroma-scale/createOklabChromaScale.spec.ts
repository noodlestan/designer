import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../../mocks';
import { type BaseSet, createBaseSet } from '../../../base';
import { type OklabChromaValue } from '../types';

import { createOklabChromaScale } from './createOklabChromaScale';

vi.mock('../../../base');

const createBaseSetMocked = vi.mocked(createBaseSet);

describe('createOklabChromaScale()', () => {
    const mockInputs: OklabChromaValue[] = [];
    const [mockValueContext] = createValueContextMock();

    const mockBaseSet = {} as BaseSet<unknown>;

    beforeEach(() => {
        vi.clearAllMocks();
        createBaseSetMocked.mockReturnValue(mockBaseSet);
    });

    it('should call createBaseSet() with the correct arguments', () => {
        createOklabChromaScale(mockValueContext, mockInputs);
        expect(createBaseSetMocked).toHaveBeenCalledWith(mockValueContext, mockInputs);
    });

    it('should return the BaseSet', () => {
        const result = createOklabChromaScale(mockValueContext, mockInputs);
        expect(result).toBe(mockBaseSet);
    });
});
