import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock, mockChannelDefinition } from '../../../mocks';
import type { ColorChannelObjectLiteral } from '../../../primitives';

import { resolveColorChannelBaseValue } from './resolveColorChannelBaseValue';
import { resolveColorChannelBaseValueRef } from './resolveColorChannelBaseValueRef';

vi.mock('./resolveColorChannelBaseValueRef');

const resolveColorChannelBaseValueRefMock = vi.mocked(resolveColorChannelBaseValueRef);

describe('resolveColorChannelBaseValue()', () => {
    const channelDef = mockChannelDefinition;
    const [mockValueContext] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue: ColorChannelObjectLiteral = { value: 0.3 };

        beforeEach(() => {
            resolveColorChannelBaseValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveColorChannelBaseValueRef with the expected arguments', () => {
            resolveColorChannelBaseValue(channelDef, mockValueContext, mockInput);

            expect(resolveColorChannelBaseValueRefMock).toHaveBeenCalledOnce();
            expect(resolveColorChannelBaseValueRefMock).toHaveBeenCalledWith(
                channelDef,
                mockValueContext,
                mockInput,
            );
        });

        it('should return the value resolved by resolveColorChannelBaseValueRef', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockValueContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a normal number', () => {
        const mockInput = 0.3;

        it('should return the input value', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockValueContext, mockInput);
            expect(result).toEqual(0.3);
        });
    });

    describe('When input is undefined', () => {
        const mockInput = 999;

        it('should return undefined', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockValueContext, mockInput);
            expect(result).toEqual(999);
        });
    });
});
