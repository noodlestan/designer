import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SpaceWithUnits } from '../../../types';
import { createValueContextMock } from '../../mocks';

import { resolveSpaceValue } from './resolveSpaceValue';
import { resolveSpaceValueRef } from './resolveSpaceValueRef';

vi.mock('./resolveSpaceValueRef');

const resolveSpaceValueRefMock = vi.mocked(resolveSpaceValueRef);

describe('resolveSpaceValue', () => {
    const [mockContext] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue: SpaceWithUnits = { value: 42, units: 'px' };

        beforeEach(() => {
            resolveSpaceValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveSpaceValueRef with the correct arguments', () => {
            resolveSpaceValue(mockContext, mockInput);

            expect(resolveSpaceValueRefMock).toHaveBeenCalledOnce();
            expect(resolveSpaceValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveSpaceValueRef', () => {
            const result = resolveSpaceValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a string', () => {
        const mockInput = '24';

        it('should return a SpaceWithUnits object with the value parsed as a number and "px" as the units', () => {
            const result = resolveSpaceValue(mockContext, mockInput);
            expect(result).toEqual({ value: 24, units: 'px' });
        });
    });

    describe('When input is a number', () => {
        const mockInput = 12;

        it('should return a SpaceWithUnits object with the value and "px" as the units', () => {
            const result = resolveSpaceValue(mockContext, mockInput);
            expect(result).toEqual({ value: 12, units: 'px' });
        });
    });

    describe('When input is already a SpaceWithUnits object', () => {
        const mockInput: SpaceWithUnits = { value: 10, units: 'em' };

        it('should return the input as-is', () => {
            const result = resolveSpaceValue(mockContext, mockInput);
            expect(result).toEqual(mockInput);
        });
    });
});
